import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { TaskDetailsHeader } from "@/features/tasks/components/task-details/task-details-header";
import { TaskError } from "@/features/tasks/components/task-error";
import { TaskNotFound } from "@/features/tasks/components/task-not-found";
import { getTaskById } from "@/features/tasks/queries/get-task-by-id";
import { PATHS } from "@/lib/paths";

const breadcrumbs = [
  {
    label: PATHS.HOME.label,
    href: PATHS.HOME.href(),
  },
  {
    label: PATHS.TASKS.label,
    href: PATHS.TASKS.href(),
  },
];

type TaskDetailsPageProps = {
  params: Promise<{ taskId: string }>;
};

export default async function TaskDetailsPage({
  params,
}: TaskDetailsPageProps) {
  const { taskId } = await params;

  try {
    const task = await getTaskById(taskId);

    // We're using a server component to handle the not found state, because the not-found.tsx page is crashing the routing system
    if (!task) return <TaskNotFound taskId={taskId} />;

    return (
      <div className="bg-background flex min-w-0 flex-1 flex-col gap-4 p-2 md:p-4 lg:p-8">
        <div className="px-2">
          <Breadcrumbs
            breadcrumbs={[...breadcrumbs, { label: task?.taskKey }]}
          />
        </div>

        {/* Task Details Layout */}
        <div className="bg-card flex min-w-0 flex-1 flex-row gap-6 rounded-lg border border-amber-400 p-4 md:p-6">
          {/* Task Details Content */}
          <div className="flex basis-3/4 flex-col gap-4">
            {/* Task Details Header and Content */}
            <div className="flex basis-1/2 flex-col gap-4">
              <div className="flex-1 border border-cyan-600">
                <TaskDetailsHeader task={task} />
              </div>
              <div className="flex-1 border border-yellow-600">
                Task Details Content
              </div>
            </div>

            {/* Task Details Activity */}
            <div className="basis-1/2 border border-red-600">
              Task Details Activity
            </div>
          </div>

          {/* Task Details Sidebar */}
          <div className="shrink-0 basis-1/4 border border-green-600">
            Task Details Sidebar
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error loading task ${taskId}:`, error);

    // Since we are in a Server Component, we pass a simple reload function
    // or let the TaskError handle its own reset via window.location
    return (
      //BUG: We're using a server component to handle the error state, because the error.tsx page is crashing the routing system as well `So Weird!`
      <TaskError
        error={error as Error}
        reset={() => {
          "use client";
          window.location.reload();
        }}
      />
    );
  }
}
