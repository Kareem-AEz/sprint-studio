"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import { getMe } from "@/features/auth/queries/get-me";
import { TaskActivityType } from "@/generated/prisma/enums";
import { PATHS } from "@/lib/paths";
import prisma from "@/lib/prisma";
import { simulateDelay } from "@/lib/utils";
import {
  ActionState,
  toErrorActionState,
  toSuccessActionState,
} from "@/response/action-state";
import { getTaskById } from "../queries/get-task-by-id";

const actionSchema = z.object({
  taskId: z.string(),
});

export const archiveTask = async (taskId: string, _prevState: ActionState) => {
  await simulateDelay();
  try {
    const user = await getMe();
    if (!user) throw new Error("Unauthorized");

    const validatedData = actionSchema.safeParse({ taskId: taskId });
    if (!validatedData.success) throw new Error("Invalid data");

    const task = await getTaskById(validatedData.data.taskId);
    if (!task) throw new Error("Task not found");

    if (user.id !== task.creatorId)
      throw new Error("You are not the creator of this task");

    await prisma.$transaction(async (tx) => {
      await tx.task.update({
        where: { id: validatedData.data.taskId },
        data: {
          archivedAt: new Date(),
        },
      });

      await tx.taskActivity.create({
        data: {
          type: TaskActivityType.TASK_ARCHIVED,
          userId: user.id,
          taskId: validatedData.data.taskId,
        },
      });
    });

    revalidatePath(PATHS.TASKS.href());

    return toSuccessActionState({
      message: "Task archived successfully",
    });
  } catch (error) {
    return toErrorActionState(error);
  }
};
