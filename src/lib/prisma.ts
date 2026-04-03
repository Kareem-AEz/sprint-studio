import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createAdapter() {
  if (process.env.TURSO_DATABASE_URL) {
    return new PrismaLibSql({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  const url = process.env.DATABASE_URL || "file:./database/db.sqlite";
  return new PrismaBetterSqlite3({ url });
}

const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter: createAdapter() });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
