import { cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import { simulateDelay } from "@/lib/utils";

export async function getTaskById(taskId: string) {
  "use cache";
  cacheTag("tasks", "task-$taskId");

  await simulateDelay();
  return await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      assignees: {
        select: {
          id: true,
          name: true,
        },
      },
      category: true,
      creator: {
        select: {
          id: true,
          name: true,
        },
      },
      activities: true,
    },
  });
}
