import { getUsers } from "@/features/auth/queries/get-users";
import { getCategories } from "@/features/tasks/queries/get-categories";
import { getTaskById } from "@/features/tasks/queries/get-task-by-id";
import { TaskNotFound } from "../task-not-found";
import { TaskForm } from "./task-form";

interface TaskFormLoaderProps {
  taskId?: string;
}

export async function TaskFormLoader({ taskId }: TaskFormLoaderProps) {
  const [users, categories, task] = await Promise.all([
    getUsers(),
    getCategories(),
    taskId ? getTaskById(taskId) : Promise.resolve(null),
  ]);

  if (taskId && !task) {
    return <TaskNotFound taskId={taskId} />;
  }

  const initialData = task
    ? {
        id: task.id,
        title: task.title,
        description: task.description ?? "",
        assigneeIds: task.assignees.map((a) => a.id),
        status: task.status,
        priority: task.priority,
        categoryId: task.categoryId,
        startDate: task.startDate,
        dueDate: task.dueDate,
      }
    : undefined;

  return (
    <TaskForm initialData={initialData} users={users} categories={categories} />
  );
}
