import prisma from "@/lib/prisma";

export async function getActivitiesById(taskId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
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
