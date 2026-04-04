import prisma from "@/lib/prisma";
import { simulateDelay } from "@/lib/utils";

export async function getCategories() {
  await simulateDelay();
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}
