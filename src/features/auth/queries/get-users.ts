import prisma from "@/lib/prisma";
import { simulateDelay } from "@/lib/utils";

export async function getUsers() {
  await simulateDelay();
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
