import { getUsers } from "@/features/auth/queries/get-users";
import { TaskForm } from "@/features/tasks/components/forms/task-form";
import { getCategories } from "@/features/tasks/queries/get-categories";

export default async function CreateTaskPage() {
  const [users, categories] = await Promise.all([getUsers(), getCategories()]);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-8 p-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Create Task</h1>
        <p className="text-muted-foreground mt-2">
          Add a new task to your workspace.
        </p>
      </div>

      <div className="bg-card flex w-full max-w-lg flex-1 flex-col gap-12 rounded-lg border p-4 md:p-6">
        <TaskForm users={users} categories={categories} />
      </div>
    </div>
  );
}
