import prisma from "@/lib/prisma";
import { simulateDelay } from "@/lib/utils";

export async function getTasks() {
  await simulateDelay();
  return await prisma.task.findMany({
    where: {
      archivedAt: null,
    },
    include: {
      assignees: {
        select: {
          id: true,
          name: true,
        },
      },
      category: true,
    },
    orderBy: [{ id: "desc" }, { createdAt: "desc" }],
  });
}
