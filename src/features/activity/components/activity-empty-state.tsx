"use client";

import { IconElectrocardiogram } from "central-icons";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface ActivityEmptyStateProps {
  type: "ALL" | "COMMENT" | "HISTORY" | string | null;
}

export function ActivityEmptyState({ type }: ActivityEmptyStateProps) {
  let title = "No activity yet";
  let description =
    "There is no activity recorded for this task yet. Comments and changes will appear here.";

  if (type === "COMMENT") {
    title = "No comments yet";
    description = "There are no comments on this task yet.";
  } else if (type === "HISTORY") {
    title = "No history yet";
    description = "There is no history recorded for this task yet.";
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center p-8">
      <Empty className="border-none">
        <EmptyHeader className="gap-4">
          <EmptyMedia variant="icon" className="size-14">
            <IconElectrocardiogram className="text-muted-foreground size-10" />
          </EmptyMedia>
          <EmptyTitle className="text-2xl font-semibold tracking-tight">
            {title}
          </EmptyTitle>
          <EmptyDescription className="flex max-w-[320px] flex-col gap-2 text-balance text-center">
            {description}
            <span className="block font-mono text-xs opacity-70">
              {`( ・∀・)っ旦`}
            </span>
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
