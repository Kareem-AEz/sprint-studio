export const PATHS = {
  HOME: {
    label: "Home",
    href: () => "/",
  },
  TASKS: {
    label: "Tasks",
    href: () => "/tasks",
  },
  TASK_EDIT: {
    label: "Edit Task",
    href: (taskId: string) => `/tasks/${taskId}/edit`,
  },
} as const;
