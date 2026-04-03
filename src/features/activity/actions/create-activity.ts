"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod/v4";
import { getMe } from "@/features/auth/queries/get-me";
import { TaskActivityType } from "@/generated/prisma/enums";
import { PATHS } from "@/lib/paths";
import prisma from "@/lib/prisma";
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
    const user = await getMe();
    if (!user) {
      throw new Error("Unauthorized");
    }
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
    revalidatePath(PATHS.TASK_DETAILS.href(taskId));
    return toSuccessActionState("Comment added successfully");
  } catch (error) {
    return toErrorActionState(error);
  }
}
