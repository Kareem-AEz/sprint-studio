import { TaskPriority, TaskStatus } from "@/generated/prisma/enums";

// ------------------------------
// Task View Options
// ------------------------------
export const TASKS_VIEW_OPTIONS_LABELS = [
  "List",
  "Board",
  "Calendar",
  "Timeline",
  "Activity",
] as const;

export type TasksViewOption = (typeof TASKS_VIEW_OPTIONS_LABELS)[number];

// ------------------------------
// Task Status & Priority Options
// ------------------------------
export const TASK_STATUS_OPTIONS = Object.values(TaskStatus);
export const TASK_PRIORITY_OPTIONS = Object.values(TaskPriority);

// ------------------------------
// Filter Options (with "all")
// ------------------------------
export const TASK_STATUS_FILTER_OPTIONS = [
  "ALL",
  ...TASK_STATUS_OPTIONS,
] as const;

export const TASK_PRIORITY_FILTER_OPTIONS = [
  "ALL",
  ...TASK_PRIORITY_OPTIONS,
] as const;
