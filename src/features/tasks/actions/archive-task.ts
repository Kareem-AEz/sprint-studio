"use server";

import { revalidateTag } from "next/cache";
import z from "zod";
import { getMe } from "@/features/auth/queries/get-me";
import { TaskActivityType } from "@/generated/prisma/enums";
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

    // =========================================================================
    // EDUCATIONAL NOTE: Cache Invalidation Strategy
    // =========================================================================
    //
    // Previously we used `revalidatePath(..., 'layout')` which was an aggressive 
    // "nuke" of the entire Client Router Cache for that layout tree:
    //
    //   revalidatePath(PATHS.TASK_DETAILS.href(validatedData.data.taskId), "page");
    //   revalidatePath(PATHS.TASKS.href(), "layout");
    //
    // Now, we use `revalidateTag("tasks", { expire: 0 })` alongside `unstable_cache` 
    // to only purge the specific data queries tagged with "tasks". Next.js 
    // intelligently figures out which routes consumed that data and purges their 
    // Client Router Caches automatically, leaving the rest of the layout intact.
    //
    // Passing `{ expire: 0 }` instead of a profile like `"max"` guarantees immediate
    // cache invalidation. If we used `"max"`, Next.js would use "Stale-While-Revalidate",
    // serving stale data on navigation while fetching fresh data in the background,
    // causing a race condition where the user has to refresh 2-3 times to see changes!
    // =========================================================================
    
    revalidateTag("tasks", { expire: 0 });

    return toSuccessActionState({
      message: "Task archived successfully",
    });
  } catch (error) {
    return toErrorActionState(error);
  }
};
