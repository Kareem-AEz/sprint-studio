import { z } from "zod/v4";

export const activityCommentFormSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters long" }),
});

export type ActivityCommentFormSchema = z.infer<
  typeof activityCommentFormSchema
>;
