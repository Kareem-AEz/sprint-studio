import { IconPlusSmall } from "central-icons";
import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskFiltersOptions } from "@/features/tasks/components/tasks-filters-options";
import { TasksTableContent } from "@/features/tasks/components/tasks-table-content";
import { TasksViewOptions } from "@/features/tasks/components/tasks-view-options";
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

export default function Tasks() {
  return (
    <div className="bg-background flex min-w-0 flex-1 flex-col gap-4 p-2 md:p-4 lg:p-8">
      {/* Breadcrumbs positioned above the main content card */}
      <div className="px-2">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* Main Content Card (The Board) */}
      <div className="bg-card flex min-w-0 flex-1 flex-col gap-12 rounded-lg border p-4 md:p-6">
        <Heading
          title="Sprint Board"
          action={
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <IconPlusSmall className="mr-1 size-5" />
              New Task
            </Button>
          }
        />

        {/* Tasks Main Content Section */}
        <div className="flex flex-1 flex-col gap-6">
          {/* View options */}
          <div className="flex h-12 min-w-0 flex-col gap-4">
            <div className="relative w-full overflow-x-auto overflow-y-hidden pl-8 md:pl-0">
              <Separator className="absolute right-0 bottom-0 left-0" />
              <Suspense
                fallback={
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-26" />
                    <Skeleton className="h-9 w-28" />
                    <Skeleton className="h-9 w-28" />
                  </div>
                }
              >
                <TasksViewOptions />
              </Suspense>
            </div>
          </div>

          {/* Tasks Filters */}
          <div>
            <Suspense
              fallback={
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-32" />
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-28" />
                  <Skeleton className="h-9 w-32" />
                </div>
              }
            >
              <TaskFiltersOptions />
            </Suspense>
          </div>

          {/* Tasks List with Suspense */}
          <div className="mt-4 flex-1">
            <Suspense
              fallback={
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              }
            >
              <TasksTableContent />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
