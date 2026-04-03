"use server";

import prisma from "@/lib/prisma";

export async function getTasks() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
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
