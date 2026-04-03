"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import { getMe } from "@/features/auth/queries/get-me";
import { PATHS } from "@/lib/paths";
import prisma from "@/lib/prisma";
import {
  toErrorActionState,
  toSuccessActionState,
} from "@/response/action-state";
import { getTaskById } from "../queries/get-task-by-id";

const actionSchema = z.object({
  taskId: z.string(),
});

export const archiveTask = async (taskId: string) => {
  try {
    const user = await getMe();
    if (!user) throw new Error("Unauthorized");

    const validatedData = actionSchema.safeParse({ taskId: taskId });
    if (!validatedData.success) throw new Error("Invalid data");

    const task = await getTaskById(validatedData.data.taskId);
    if (!task) throw new Error("Task not found");

    if (user.id !== task.creatorId)
      throw new Error("You are not the creator of this task");

    await prisma.task.update({
      where: { id: validatedData.data.taskId },
      data: { archivedAt: new Date() },
    });

    revalidatePath(PATHS.TASK_DETAILS.href(validatedData.data.taskId));
    revalidatePath(PATHS.TASKS.href());
    return toSuccessActionState("Task archived successfully");
  } catch (error) {
    return toErrorActionState(error);
  }
};
