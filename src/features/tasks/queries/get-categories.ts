import prisma from "@/lib/prisma";

export async function getCategories() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}
