import { cacheLife, cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import { simulateDelay } from "@/lib/utils";

export async function getActivitiesById(taskId: string) {
  "use cache";
  cacheTag(`task-activity-${taskId}`);
  cacheLife("max");

  await simulateDelay();
  return await prisma.taskActivity.findMany({
    where: { taskId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  });
}
