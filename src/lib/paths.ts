export const PATHS = {
  HOME: {
    label: "Home",
    href: () => "/",
  },
  TASKS: {
    label: "Tasks",
    href: () => "/tasks",
  },
  TASK_CREATE: {
    label: "Create Task",
    href: () => "/tasks/create",
  },
  TASK_EDIT: {
    label: "Edit Task",
    href: (taskId: string) => `/tasks/${taskId}/edit`,
  },
  TASK_DETAILS: {
    label: "Task Details",
    href: (taskId: string) => `/tasks/${taskId}`,
  },
} as const;
