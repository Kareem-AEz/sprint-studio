"use server";

import { updateTag } from "next/cache";
import { z } from "zod/v4";
import { getMe } from "@/features/auth/queries/get-me";
import { TaskActivityType } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { simulateDelay } from "@/lib/utils";
import {
  toErrorActionState,
  toSuccessActionState,
} from "@/response/action-state";
import { activityCommentFormSchema } from "../schemas";

const schema = activityCommentFormSchema.extend({
  taskId: z.string(),
});

export async function createActivity(formData: FormData) {
  try {
    await simulateDelay();
    const user = await getMe();
    if (!user) throw new Error("Unauthorized");
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = schema.safeParse(rawData);

    if (!validatedData.success) {
      throw new Error("Invalid form data. Please check your comments.");
    }
    const { taskId, content } = validatedData.data;
    await prisma.taskActivity.create({
      data: {
        taskId,
        content,
        userId: user.id,
        type: TaskActivityType.COMMENT_ADDED,
      },
    });
    updateTag(`task-activity-${taskId}`);
    return toSuccessActionState({
      message: "Comment added successfully",
    });
  } catch (error) {
    return toErrorActionState(error);
  }
}
