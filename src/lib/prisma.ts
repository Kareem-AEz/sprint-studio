import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const url = process.env.DATABASE_URL || "file:./database/db.sqlite";

const adapter = new PrismaBetterSqlite3({
  url,
});
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
