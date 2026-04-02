import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import {
  PrismaClient,
  TaskActivityType,
  TaskPriority,
  TaskStatus,
} from "@/generated/prisma/client";

// Following the documentation: PrismaBetterSqlite3 expects an object with a 'url' property.
const url = process.env.DATABASE_URL || "file:./database/db.sqlite";

const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

const users = [
  {
    name: "Kareem",
    email: "kareem@example.com",
  },
  {
    name: "Ali",
    email: "ali@example.com",
  },
  {
    name: "Sarah",
    email: "sarah@example.com",
  },
];

const categories = [
  {
    name: "Design",
  },
  {
    name: "Development",
  },
];

async function main() {
  console.log("Seeding started...");
  console.log("Using DATABASE_URL:", url);

  // 1. Cleanup existing data
  await prisma.taskActivity.deleteMany();
  await prisma.task.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const createdUsers = await prisma.user.createManyAndReturn({
    data: users,
  });
  console.log(`Created ${createdUsers.length} users`);

  // 3. Create Categories
  const createdCategories = await prisma.category.createManyAndReturn({
    data: categories,
  });
  console.log(`Created ${createdCategories.length} categories`);

  // Helpers to find created records
  const getUser = (email: string) =>
    createdUsers.find((u) => u.email === email)!;
  const getCategory = (name: string) =>
    createdCategories.find((c) => c.name === name)!;

  const kareem = getUser("kareem@example.com");
  const ali = getUser("ali@example.com");
  const sarah = getUser("sarah@example.com");

  const design = getCategory("Design");
  const dev = getCategory("Development");

  // 4. Create Tasks
  await prisma.task.create({
    data: {
      taskKey: "SPR-1",
      title: "Design Landing Page",
      description: "Create a modern landing page design for Sprint Studio",
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      creatorId: kareem.id,
      categoryId: design.id,
      assignees: {
        connect: [{ id: kareem.id }, { id: sarah.id }],
      },
      activities: {
        create: [
          {
            type: TaskActivityType.TASK_CREATED,
            userId: kareem.id,
            content: "Task created by Kareem",
          },
        ],
      },
    },
  });

  await prisma.task.create({
    data: {
      taskKey: "SPR-2",
      title: "Initialize Project",
      description: "Setup Next.js and Prisma for the project",
      status: TaskStatus.DONE,
      priority: TaskPriority.URGENT,
      creatorId: kareem.id,
      categoryId: dev.id,
      assignees: {
        connect: [{ id: ali.id }],
      },
      activities: {
        create: [
          {
            type: TaskActivityType.TASK_CREATED,
            userId: kareem.id,
            content: "Task created by Kareem",
          },
          {
            type: TaskActivityType.STATUS_CHANGE,
            userId: ali.id,
            oldValue: TaskStatus.BACKLOG,
            newValue: TaskStatus.DONE,
            content: "Status changed to DONE",
          },
        ],
      },
    },
  });

  await prisma.task.create({
    data: {
      taskKey: "SPR-3",
      title: "Write Documentation",
      description: "Document the API and schema",
      status: TaskStatus.BACKLOG,
      priority: TaskPriority.LOW,
      creatorId: ali.id,
      categoryId: dev.id,
      assignees: {
        connect: [{ id: ali.id }],
      },
      activities: {
        create: [
          {
            type: TaskActivityType.TASK_CREATED,
            userId: ali.id,
            content: "Sarah assigned to documentation",
          },
        ],
      },
    },
  });
  console.log(`Created 3 tasks`);

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
