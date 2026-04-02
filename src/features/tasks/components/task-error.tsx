"use client";

import { Alert02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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

interface TaskErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function TaskError({ error, reset }: TaskErrorProps) {
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
        <span className="text-destructive flex items-center gap-1 font-mono">
          Error
          <span aria-hidden="true">{`(┛ಠ_ಠ)┛彡┻━┻`}</span>
        </span>
      ),
    },
  ];

  return (
    <div className="bg-background flex min-w-0 flex-1 flex-col gap-4 p-2 md:p-4 lg:p-8">
      <div className="px-2">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      <div className="bg-card flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg border p-4 md:p-6">
        <Empty className="border-none">
          <EmptyHeader>
            <EmptyMedia
              variant="icon"
              className="bg-destructive/10 text-destructive size-10"
            >
              <HugeiconsIcon
                icon={Alert02Icon}
                strokeWidth={2}
                className="size-6"
              />
            </EmptyMedia>
            <EmptyTitle className="text-2xl font-semibold tracking-tight">
              Something went wrong
            </EmptyTitle>
            <EmptyDescription className="max-w-[320px] text-balance">
              {error.digest && (
                <span className="text-muted-foreground mb-2 block truncate font-mono text-xs">
                  Error Digest:{" "}
                  <span className="font-mono tracking-wide">
                    {error.digest}
                  </span>
                </span>
              )}
              An unexpected error occurred while loading this task. We&apos;ve
              been notified and are looking into it.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row items-center justify-center gap-2">
            <Button
              onClick={reset}
              variant="default"
              size="lg"
              className="rounded-xl"
            >
              Try Again
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link href={PATHS.TASKS.href()}>Back to Sprint Board</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  );
}
