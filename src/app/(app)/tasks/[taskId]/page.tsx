import { Suspense } from "react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityDetails } from "@/features/activity/components/activity-details";
import { ActivitySkeleton } from "@/features/activity/components/activity-skeleton";
import { activitySearchParamsCache } from "@/features/activity/lib/search-params";
import { TaskDetailsContent } from "@/features/tasks/components/task-details/task-details-content";
import { TaskDetailsHeader } from "@/features/tasks/components/task-details/task-details-header";
import { TaskDetailsSidebar } from "@/features/tasks/components/task-details/task-details-sidebar";
import { TaskDevUtils } from "@/features/tasks/components/task-details/task-dev-utils";
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

  // Initialize variables to hold data and potential errors
  let task = null;
  let fetchError = null;

  // DEV UTILS: Handle simulation parameters before data fetching
  if (sp.simulate === "not-found") return <TaskNotFound taskId={taskId} />;
  if (sp.simulate === "error") {
    return (
      <TaskError
        error={new Error("Simulated Server Error in Task Details")}
        reset={() => {
          "use client";
          window.location.reload();
        }}
      />
    );
  }
  if (sp.simulate === "empty") return <TasksEmptyState />;

  try {
    // 1. ONLY the data fetching goes inside the try/catch
    task = await getTaskById(taskId);
  } catch (error) {
    console.error(`Error loading task ${taskId}:`, error);
    fetchError = error;
  }

  // 2. Handle the Error state (JSX constructed OUTSIDE the try/catch)
  if (fetchError) {
    return (
      <TaskError
        error={fetchError as Error}
        reset={() => {
          "use client";
          window.location.reload();
        }}
      />
    );
  }

  // 3. Handle the Not Found state
  if (!task) {
    return <TaskNotFound taskId={taskId} />;
  }

  // 4. Normal Render
  return (
    <div className="bg-background flex min-w-0 flex-1 flex-col gap-4 p-2 md:p-4 lg:p-8">
      <div className="flex items-center justify-between px-2">
        <Breadcrumbs breadcrumbs={[...breadcrumbs, { label: task?.taskKey }]} />
        <TaskDevUtils />
      </div>

      {/* Task Details Layout */}
      <div className="bg-card flex min-w-0 flex-1 flex-row gap-6 rounded-lg border">
        {/* Task Details Content */}
        <div className="flex flex-1 flex-col gap-12 p-4 md:basis-3/4 md:p-6">
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
            <Suspense fallback={<ActivitySkeleton />}>
              <ActivityDetails taskId={taskId} />
            </Suspense>
          </div>
        </div>

        {/* Task Details Sidebar */}
        <aside className="hidden shrink-0 basis-1/4 md:flex">
          <Suspense
            fallback={
              <div className="flex flex-1 flex-col gap-12 border-l p-4 py-8">
                <Skeleton className="mb-8 h-6 w-32" />
                <div className="flex flex-col gap-8 border-b pb-8">
                  {[...Array(4)].map((_, idx) => (
                    <div className="flex flex-col gap-2" key={idx}>
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-6 w-full" />
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  {[...Array(4)].map((_, idx) => (
                    <div className="flex flex-col justify-between" key={idx}>
                      <Skeleton className="mb-1 h-3 w-14 opacity-60" />
                      <Skeleton className="h-4 w-24" />
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
}
