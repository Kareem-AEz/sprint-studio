export const TASKS_VIEW_OPTIONS_LABELS = [
  "List",
  "Board",
  "Calendar",
  "Timeline",
  "Activity",
] as const;

export type TasksViewOption = (typeof TASKS_VIEW_OPTIONS_LABELS)[number];
