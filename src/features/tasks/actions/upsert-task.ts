"use server";

import { revalidatePath } from "next/cache";
import { getMe } from "@/features/auth/queries/get-me";
import { Task } from "@/generated/prisma/client";
import { TaskActivityType } from "@/generated/prisma/enums";
import { PATHS } from "@/lib/paths";
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

    revalidatePath(PATHS.TASKS.href());

    if (taskId) {
      revalidatePath(PATHS.TASK_DETAILS.href(taskId));
      revalidatePath(PATHS.TASKS.href());
    }

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
