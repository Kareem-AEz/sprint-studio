import { IconArchiveJunk } from "central-icons";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PATHS } from "@/lib/paths";

interface TaskNotFoundProps {
  taskId?: string;
}

export function TaskNotFound({ taskId }: TaskNotFoundProps) {
  const breadcrumbs = [
    {
      label: PATHS.HOME.label,
      href: PATHS.HOME.href(),
    },
    {
      label: PATHS.TASKS.label,
      href: PATHS.TASKS.href(),
    },
    {
      label: (
        <span className="flex items-center gap-1 font-mono">
          Not&nbsp;Found
          <span aria-hidden="true">{`(╯°□°)╯︵ ┻━┻`}</span>
        </span>
      ),
    },
  ];

  return (
    <div className="bg-background flex min-w-0 flex-1 flex-col gap-4 p-2 md:p-4 lg:p-8">
      {/* Breadcrumbs for navigation context */}
      <div className="px-2">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* Main Empty State Container */}
      <div className="bg-card flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg border p-4 md:p-6">
        <Empty className="border-none">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="size-10">
              <IconArchiveJunk className="text-muted-foreground size-6" />
            </EmptyMedia>
            <EmptyTitle className="text-2xl font-semibold tracking-tight">
              Task not found
            </EmptyTitle>
            <EmptyDescription className="max-w-[320px] text-balance">
              {taskId && (
                <span className="text-muted-foreground mb-2 block truncate font-mono text-xs">
                  Task ID:{" "}
                  <span className="font-mono tracking-wide break-all">
                    {taskId}
                  </span>
                </span>
              )}
              The task you&apos;re looking for doesn&apos;t exist, has been
              deleted, or you don&apos;t have permission to view it.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="mt-4 rounded-xl"
            >
              <Link href={PATHS.TASKS.href()}>Back to Sprint Board</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  );
}
