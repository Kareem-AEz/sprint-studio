"use client";

import { formatRelativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ActivityActionProps {
  /**
   * The content of the action (e.g., "Sarah Chen changed status to [In Progress]")
   */
  children: React.ReactNode;
  /**
   * The date of the action.
   */
  createdAt: Date | string | number;
  /**
   * Whether this is the last item in the list (to hide the vertical line).
   */
  isLast?: boolean;
  className?: string;
}

/**
 * A component to display a simple action in an activity feed (e.g., status change, creation).
 * Features a small circle indicator and a connector line.
 */
export function ActivityAction({
  children,
  createdAt,
  isLast = false,
  className,
}: ActivityActionProps) {
  return (
    <div className={cn("group relative flex gap-3 pb-8", className)}>
      {/* Vertical line (timeline connector) */}
      {!isLast && (
        <div
          className="bg-border/40 absolute top-5 bottom-0 left-[15px] w-[1.5px]"
          aria-hidden="true"
        />
      )}

      {/* Small Circle Indicator Container */}
      <div className="relative z-10 flex h-8 w-8 items-center justify-center">
        <div className="border-muted-foreground/30 h-2.5 w-2.5 rounded-full border-2 bg-background shadow-sm" />
      </div>

      {/* Action Content */}
      <div className="flex flex-1 items-baseline gap-2 pt-1.5">
        <div className="text-sm leading-none text-foreground">
          {children}
        </div>
        <span className="text-muted-foreground text-xs whitespace-nowrap">
          {formatRelativeTime(createdAt)}
        </span>
      </div>
    </div>
  );
}
