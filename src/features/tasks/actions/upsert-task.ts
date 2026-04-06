"use server";

import { revalidateTag } from "next/cache";
import { getMe } from "@/features/auth/queries/get-me";
import { Task } from "@/generated/prisma/client";
import { TaskActivityType } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { simulateDelay } from "@/lib/utils";
import {
  ActionState,
  toErrorActionState,
  toSuccessActionState,
} from "@/response/action-state";
import { taskFormSchema } from "../schemas";

export const upsertTask = async (
  _prevState: ActionState,
  formData: FormData,
  taskId?: string,
): Promise<ActionState<Task>> => {
  await simulateDelay();
  try {
    const user = await getMe();
    if (!user) throw new Error("Unauthorized");

    const rawData = Object.fromEntries(formData.entries());

    // Handle array for assigneeIds
    let assigneeIds: string[] = [];
    const rawAssignees = formData.get("assigneeIds");
    if (rawAssignees) {
      try {
        assigneeIds = JSON.parse(rawAssignees as string);
      } catch {
        assigneeIds = formData.getAll("assigneeIds") as string[];
      }
    }

    // Handle dates
    const startDateRaw = formData.get("startDate");
    const dueDateRaw = formData.get("dueDate");

    const validatedData = taskFormSchema.safeParse({
      ...rawData,
      assigneeIds,
      startDate: startDateRaw ? new Date(startDateRaw as string) : null,
      dueDate: dueDateRaw ? new Date(dueDateRaw as string) : null,
    });

    if (!validatedData.success) {
      throw new Error("Invalid data");
    }

    const {
      assigneeIds: finalAssigneeIds,
      categoryId,
      ...data
    } = validatedData.data;

    // Handle Category: Find or Create
    let finalCategoryId = categoryId;
    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ id: categoryId }, { name: { equals: categoryId } }],
      },
    });

    if (!existingCategory) {
      const newCategory = await prisma.category.create({
        data: { name: categoryId },
      });
      finalCategoryId = newCategory.id;
    } else {
      finalCategoryId = existingCategory.id;
    }

    let task: Task;
    if (taskId) {
      // Update
      const existingTask = await prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!existingTask) throw new Error("Task not found");
      if (existingTask.creatorId !== user.id) {
        throw new Error("You are not the creator of this task");
      }

      const activitiesToCreate: {
        type: TaskActivityType;
        userId: string;
        taskId: string;
        oldValue?: string;
        newValue?: string;
      }[] = [];

      if (existingTask.status !== data.status) {
        activitiesToCreate.push({
          type: TaskActivityType.STATUS_CHANGE,
          userId: user.id,
          taskId: taskId,
          oldValue: existingTask.status,
          newValue: data.status,
        });
      }

      if (existingTask.priority !== data.priority) {
        activitiesToCreate.push({
          type: TaskActivityType.PRIORITY_CHANGE,
          userId: user.id,
          taskId: taskId,
          oldValue: existingTask.priority,
          newValue: data.priority,
        });
      }

      task = await prisma.$transaction(async (tx) => {
        const updatedTask = await tx.task.update({
          where: { id: taskId },
          data: {
            ...data,
            categoryId: finalCategoryId,
            assignees: {
              set: finalAssigneeIds.map((id) => ({ id })),
            },
          },
        });

        if (activitiesToCreate.length > 0) {
          await tx.taskActivity.createMany({
            data: activitiesToCreate,
          });
        }

        return updatedTask;
      });
    } else {
      // Create
      const count = await prisma.task.count();
      const taskKey = `TASK-${count + 1}`;

      task = await prisma.task.create({
        data: {
          ...data,
          taskKey,
          creatorId: user.id,
          categoryId: finalCategoryId,
          assignees: {
            connect: finalAssigneeIds.map((id) => ({ id })),
          },
          activities: {
            create: {
              type: TaskActivityType.TASK_CREATED,
              userId: user.id,
            },
          },
        },
      });
    }

    // =========================================================================
    // EDUCATIONAL NOTE: Cache Invalidation Strategy
    // =========================================================================
    //
    // 1. THE OLD WAY: revalidatePath (URL-Based Invalidation)
    // -------------------------------------------------------------------------
    // Previously, we invalidated specific routes by their URLs:
    //
    //   revalidatePath(PATHS.TASKS.href());
    //   if (taskId) revalidatePath(PATHS.TASK_DETAILS.href(taskId));
    //
    // Problem: `revalidatePath(..., 'page')` (the default) clears the server
    // cache for that specific page, but on fully static routes, the browser's
    // Client Router Cache may STILL serve the stale pre-fetched payload when
    // navigating back via `router.push()`.
    //
    // To fix this, you have to nuke the entire layout cache:
    //   revalidatePath(PATHS.TASKS.href(), "layout");
    //
    // But this is inefficient because it throws away the cache for everything
    // in that layout (e.g. expensive sidebars, headers, etc.).
    //
    //
    // 2. THE NEW WAY: revalidateTag (Data-Based Invalidation)
    // -------------------------------------------------------------------------
    // Starting in newer Next.js versions (15/16), the recommended approach is
    // tagging the underlying data queries (using unstable_cache or `use cache`)
    // and invalidating those tags directly.
    //
    // When we invalidate the "tasks" tag, Next.js:
    //   a) Clears ONLY the specific data queries tagged with "tasks".
    //   b) Intelligently purges the Client Router Cache for ANY route that
    //      consumed that data (like /tasks or /tasks/[taskId]).
    //   c) Leaves the layout cache perfectly intact!
    //
    // In Next.js 16+, revalidateTag requires a cacheLife profile as a second
    // argument. Using `{ expire: 0 }` instead of `"max"` ensures that the cache 
    // is instantly expired. If we used `"max"`, Next.js would use "Stale-While-Revalidate",
    // instantly serving stale data on navigation while fetching fresh data in the background,
    // which leads to the user needing to manually refresh 2-3 times to see their changes!
    // =========================================================================

    // Surgically invalidate only the data tagged with 'tasks'
    revalidateTag("tasks", { expire: 0 });

    return toSuccessActionState({
      message: taskId
        ? "Task updated successfully"
        : "Task created successfully",
      data: task,
    });
  } catch (error) {
    return toErrorActionState(error);
  }
};
