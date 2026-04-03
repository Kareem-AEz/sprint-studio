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
    name: "Kareem Ahmed",
    email: "kareem@example.com",
  },
  {
    name: "Ali Hassan",
    email: "ali@example.com",
  },
  {
    name: "Sarah Ibrahim",
    email: "sarah@example.com",
  },
  {
    name: "Layla Mohamed",
    email: "layla@example.com",
  },
  {
    name: "Mona Youssef",
    email: "mona@example.com",
  },
  {
    name: "Omar Farouk",
    email: "omar@example.com",
  },
  {
    name: "Yasmin Elshamy",
    email: "yasmin@example.com",
  },
  {
    name: "Hani Mostafa",
    email: "hani@example.com",
  },
  {
    name: "Dina Saad",
    email: "dina@example.com",
  },
  {
    name: "Tarek Nabil",
    email: "tarek@example.com",
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
  const layla = getUser("layla@example.com");
  const mona = getUser("mona@example.com");
  const omar = getUser("omar@example.com");
  const yasmin = getUser("yasmin@example.com");
  const hani = getUser("hani@example.com");
  const dina = getUser("dina@example.com");
  const tarek = getUser("tarek@example.com");

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
        connect: [
          { id: kareem.id },
          { id: sarah.id },
          { id: layla.id },
          { id: mona.id },
          { id: omar.id },
        ],
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
      startDate: new Date(new Date().setDate(new Date().getDate() - 8)),
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
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
      taskKey: "SPR-6",
      title: "Add Task Priority",
      description: "Add a priority field to the task",
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.MEDIUM,
      creatorId: kareem.id,
      categoryId: dev.id,
      startDate: new Date(new Date().setDate(new Date().getDate() - 8)),
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      assignees: {
        connect: [{ id: kareem.id }, { id: sarah.id }, { id: layla.id }],
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
      title: "Add Task Priority",
      description: "Add a priority field to the task",
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.MEDIUM,
      creatorId: kareem.id,
      categoryId: dev.id,
      startDate: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      assignees: {
        connect: [{ id: kareem.id }, { id: sarah.id }, { id: layla.id }],
      },
      activities: {
        create: [
          {
            type: TaskActivityType.TASK_CREATED,
            userId: kareem.id,
            content: "Task created by Kareem",
          },
          {
            type: TaskActivityType.PRIORITY_CHANGE,
            userId: kareem.id,
            oldValue: TaskPriority.MEDIUM,
            newValue: TaskPriority.HIGH,
            content: "Priority changed to HIGH",
          },
        ],
      },
    },
  });

  await prisma.task.create({
    data: {
      taskKey: "WRK-4",
      title: "Write Documentation",
      description: "Document the API and schema",
      status: TaskStatus.BACKLOG,
      priority: TaskPriority.LOW,
      creatorId: ali.id,
      categoryId: dev.id,
      startDate: new Date(new Date().setDate(new Date().getDate() - 5)),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
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
          {
            type: TaskActivityType.COMMENT_ADDED,
            userId: ali.id,
            content: "Comment added by Ali",
          },
          {
            type: TaskActivityType.COMMENT_ADDED,
            userId: ali.id,
            content: "Comment added by Ali",
          },
        ],
      },
    },
  });

  const tasks = await prisma.task.findMany();
  console.log(`Created ${tasks.length} tasks`);

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
