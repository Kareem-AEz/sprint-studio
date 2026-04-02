import prisma from "@/lib/prisma";

export async function getTaskById(taskId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
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
