"use client";

import { UserAvatar } from "@/features/auth/components/user-avatar";
import { formatRelativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ActivityCommentProps {
  userName: string;
  userImage?: string | null;
  /**
   * The date of the comment.
   */
  createdAt: Date | string | number;
  /**
   * The comment text.
   */
  content: string;
  /**
   * Whether this is the last item in the list (to hide the vertical line).
   */
  isLast?: boolean;
  className?: string;
}

/**
 * A component to display a user comment in an activity feed.
 * Follows the design with an avatar, name, relative time, and a connector line.
 */
export function ActivityComment({
  userName,
  userImage,
  createdAt,
  content,
  isLast = false,
  className,
}: ActivityCommentProps) {
  return (
    <div className={cn("group relative flex gap-3 pb-8", className)}>
      {/* Vertical line (timeline connector) */}
      {!isLast && (
        <div
          className="bg-border/40 absolute top-9 bottom-0 left-[15px] w-[1.5px]"
          aria-hidden="true"
        />
      )}

      {/* Avatar Container */}
      <div className="relative z-10">
        <UserAvatar
          name={userName}
          image={userImage}
          className="border-background size-8 rounded-full border shadow-sm"
        />
      </div>

      {/* Comment Content */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-foreground text-sm font-semibold tracking-tight">
            {userName}
          </span>
          <span className="text-muted-foreground text-xs">
            {formatRelativeTime(createdAt)}
          </span>
        </div>

        <div className="border-border/40 bg-muted/5 hover:border-border/60 hover:bg-muted/10 rounded-2xl border px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.01)] transition-colors">
          <p className="text-foreground/90 text-[13.5px] leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
