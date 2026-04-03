import { notFound } from "next/navigation";
import { getUsers } from "@/features/auth/queries/get-users";
import { TaskForm } from "@/features/tasks/components/forms/task-form";
import { getCategories } from "@/features/tasks/queries/get-categories";
import { getTaskById } from "@/features/tasks/queries/get-task-by-id";

interface TaskEditPageProps {
  params: Promise<{
    taskId: string;
  }>;
}

export default async function TaskEditPage({ params }: TaskEditPageProps) {
  const { taskId } = await params;

  const [task, users, categories] = await Promise.all([
    getTaskById(taskId),
    getUsers(),
    getCategories(),
  ]);

  if (!task) {
    notFound();
  }

  const initialData = {
    id: task.id,
    title: task.title,
    description: task.description ?? "",
    assigneeIds: task.assignees.map((a) => a.id),
    status: task.status,
    priority: task.priority,
    categoryId: task.categoryId,
    startDate: task.startDate,
    dueDate: task.dueDate,
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-8 p-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Edit Task</h1>
        <p className="text-muted-foreground mt-2">Update task details.</p>
      </div>

      <div className="bg-card flex w-full max-w-lg flex-1 flex-col gap-12 rounded-lg border p-4 md:p-6">
        <TaskForm
          initialData={initialData}
          users={users}
          categories={categories}
        />
      </div>
    </div>
  );
}
