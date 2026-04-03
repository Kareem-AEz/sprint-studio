import "dotenv/config";
import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { join } from "path";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error("TURSO_DATABASE_URL is not set");
  process.exit(1);
}

const client = createClient({ url, authToken });

const migrationsDir = join(process.cwd(), "prisma/migrations");
const migrationFiles = ["20260401194803_init_schema/migration.sql"];

async function migrate() {
  console.log("Running migrations against Turso...");

  for (const file of migrationFiles) {
    const sql = readFileSync(join(migrationsDir, file), "utf-8");
    const statements = sql
      .split(";")
      .map((s) =>
        s
          .split("\n")
          .filter((line) => !line.trim().startsWith("--"))
          .join("\n")
          .trim(),
      )
      .filter((s) => s.length > 0);

    await client.batch(
      statements.map((sql) => ({ sql, args: [] })),
      "write",
    );
    console.log(`Applied: ${file}`);
  }

  console.log("Migrations complete.");
  process.exit(0);
}

migrate().catch((e) => {
  console.error("Migration failed:", e);
  process.exit(1);
});
