import { Suspense } from "react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { ActivityDetails } from "@/features/activity/components/activity-details";
import { activitySearchParamsCache } from "@/features/activity/lib/search-params";
import { TaskDetailsContent } from "@/features/tasks/components/task-details/task-details-content";
import { TaskDetailsHeader } from "@/features/tasks/components/task-details/task-details-header";
import { TaskDetailsSidebar } from "@/features/tasks/components/task-details/task-details-sidebar";
import { TaskError } from "@/features/tasks/components/task-error";
import { TaskNotFound } from "@/features/tasks/components/task-not-found";
import { TasksEmptyState } from "@/features/tasks/components/tasks-empty-state";
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
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TaskDetailsPage({
  params,
  searchParams,
}: TaskDetailsPageProps) {
  const { taskId } = await params;
  const sp = await searchParams;
  await activitySearchParamsCache.parse(searchParams);

  try {
    // Simulate not found if requested
    if (sp.simulate === "not-found") return <TaskNotFound taskId={taskId} />;
    // Simulate error if requested
    if (sp.simulate === "error") throw new Error("Simulated Server Error in Task Details");
    // Simulate empty state if requested
    if (sp.simulate === "empty") return <TasksEmptyState />;

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
        <div className="bg-card flex min-w-0 flex-1 flex-row gap-6 rounded-lg border">
          {/* Task Details Content */}
          <div className="flex flex-1 flex-col gap-12 p-4 md:basis-3/4 md:p-6">
            {/* Task Details Header and Content */}
            <div className="flex flex-col gap-8">
              <div>
                <TaskDetailsHeader task={task} />
              </div>
              <Separator />
              <div>
                <TaskDetailsContent task={task} />
              </div>
            </div>

            <Separator />

            {/* Task Details Activity */}
            <div className="flex flex-1">
              <Suspense
                fallback={<div className="bg-muted h-6 w-24 rounded" />}
              >
                <ActivityDetails taskId={taskId} />
              </Suspense>
            </div>
          </div>

          {/* Task Details Sidebar */}
          <aside className="hidden shrink-0 basis-1/4 md:flex">
            <Suspense
              fallback={
                <div className="flex flex-1 animate-pulse flex-col gap-12 border-l p-4 pt-0">
                  {/* Sidebar header */}
                  <div className="bg-muted mb-8 h-6 w-32 rounded" />
                  {/* Sidebar content sections */}
                  <div className="flex flex-col gap-8 border-b pb-8">
                    {[...Array(4)].map((_, idx) => (
                      <div className="flex flex-col gap-2" key={idx}>
                        <div className="bg-muted h-4 w-16 rounded" />
                        <div className="bg-muted h-6 w-full rounded" />
                      </div>
                    ))}
                  </div>
                  {/* Timeline */}
                  <div className="mt-8 flex flex-col gap-4">
                    {[...Array(4)].map((_, idx) => (
                      <div className="flex flex-col justify-between" key={idx}>
                        <div className="bg-muted/60 mb-1 h-3 w-14 rounded" />
                        <div className="bg-muted h-4 w-24 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              }
            >
              <TaskDetailsSidebar task={task} />
            </Suspense>
          </aside>
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
