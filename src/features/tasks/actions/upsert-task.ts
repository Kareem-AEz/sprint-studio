"use server";

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

    const allAssignees = formData.getAll("assigneeIds");
    let assigneeIds: string[] = [];
    if (allAssignees.length === 1 && typeof allAssignees[0] === "string") {
      try {
        const parsed = JSON.parse(allAssignees[0]);
        assigneeIds = Array.isArray(parsed) ? parsed : [allAssignees[0]];
      } catch {
        assigneeIds = [allAssignees[0]];
      }
    } else {
      assigneeIds = allAssignees.filter((a) => typeof a === "string");
    }

    const startDateRaw = formData.get("startDate");
    const dueDateRaw = formData.get("dueDate");

    const payload = {
      ...Object.fromEntries(formData.entries()),
      assigneeIds,
      startDate:
        startDateRaw && startDateRaw !== "null"
          ? new Date(startDateRaw as string)
          : null,
      dueDate:
        dueDateRaw && dueDateRaw !== "null"
          ? new Date(dueDateRaw as string)
          : null,
    };

    const validatedData = taskFormSchema.safeParse(payload);

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
        oldValue?: string;
        newValue?: string;
      }[] = [];

      if (existingTask.status !== data.status) {
        activitiesToCreate.push({
          type: TaskActivityType.STATUS_CHANGE,
          userId: user.id,
          oldValue: existingTask.status,
          newValue: data.status,
        });
      }

      if (existingTask.priority !== data.priority) {
        activitiesToCreate.push({
          type: TaskActivityType.PRIORITY_CHANGE,
          userId: user.id,
          oldValue: existingTask.priority,
          newValue: data.priority,
        });
      }

      // Perform a single nested write without explicit transaction
      task = await prisma.task.update({
        where: { id: taskId },
        data: {
          ...data,
          categoryId: finalCategoryId,
          assignees: {
            set: finalAssigneeIds.map((id) => ({ id })),
          },
          ...(activitiesToCreate.length > 0 && {
            activities: {
              createMany: {
                data: activitiesToCreate,
              },
            },
          }),
        },
      });
    } else {
      // Create
      const lastTask = await prisma.task.findFirst({
        orderBy: { createdAt: "desc" },
        select: { taskKey: true },
      });

      let nextNum = 1;
      if (lastTask && lastTask.taskKey.startsWith("TASK-")) {
        const lastNum = parseInt(lastTask.taskKey.replace("TASK-", ""), 10);
        if (!isNaN(lastNum)) {
          nextNum = lastNum + 1;
        }
      } else {
        const count = await prisma.task.count();
        nextNum = count + 1;
      }

      const taskKey = `TASK-${nextNum}`;

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
