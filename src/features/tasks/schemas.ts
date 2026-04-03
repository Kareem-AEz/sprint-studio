import { z } from "zod/v4";
import { TaskPriority, TaskStatus } from "@/generated/prisma/enums";

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be less than 100 characters long" }),
  description: z.string().optional(),
  assigneeIds: z.array(z.string()),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  categoryId: z.string().min(1, { message: "Please select a category" }),
  startDate: z.date().optional().nullable(),
  dueDate: z.date().optional().nullable(),
});

export type TaskFormSchema = z.infer<typeof taskFormSchema>;
