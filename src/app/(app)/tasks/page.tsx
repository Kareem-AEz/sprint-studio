import { IconPlusSmall } from "central-icons";
import { Heading } from "@/components/heading";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
    <div className="bg-background flex flex-1 flex-col gap-4 p-4 md:p-8">
      {/* Breadcrumbs positioned above the main content card */}
      <div className="px-2">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* Main Content Card (The Board) */}
      <div className="bg-card flex flex-1 flex-col gap-12 rounded-lg border p-6">
        <Heading
          title="Sprint Board"
          action={
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <IconPlusSmall className="mr-1 size-5" />
              New Task
            </Button>
          }
        />

        <div className="">
          {/* View options */}
          <div className="relative flex flex-col gap-4">
            <TasksViewOptions className="z-10" />
            <Separator className="absolute right-0 bottom-0 left-0" />
          </div>

          {/* Tasks Filters */}
        </div>
      </div>
    </div>
  );
}
