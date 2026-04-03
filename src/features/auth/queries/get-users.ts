import prisma from "@/lib/prisma";

export async function getUsers() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}
