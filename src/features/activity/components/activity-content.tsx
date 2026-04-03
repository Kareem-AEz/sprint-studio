"use client";

import { useQueryState } from "nuqs";
import { TaskPriorityBadge } from "@/features/tasks/components/badges/task-priority-badge";
import { TaskStatusBadge } from "@/features/tasks/components/badges/task-status-badge";
import {
  TaskActivityType,
  TaskPriority,
  TaskStatus,
} from "@/generated/prisma/enums";
import { activitySearchParams } from "../lib/search-params";
import { Activity } from "../queries/types";
import { ActivityAction } from "./activity-action";
import { ActivityComment } from "./activity-comment";

interface ActivityContentProps {
  activities: Activity[];
}

/**
 * A dedicated component for rendering the activity list content.
 * Handles different activity types and the empty state.
 */
export function ActivityContent({ activities }: ActivityContentProps) {
  const [type] = useQueryState("type", activitySearchParams.type);

  // Apply client-side filtering based on the 'type' query parameter
  const filteredActivities = activities.filter((activity) => {
    if (type === "ALL") return true;
    if (type === "COMMENT")
      return activity.type === TaskActivityType.COMMENT_ADDED;
    if (type === "HISTORY")
      return activity.type !== TaskActivityType.COMMENT_ADDED;
    return true;
  });

  if (filteredActivities.length === 0) {
    return (
      <div className="text-muted-foreground flex h-32 items-center justify-center text-sm italic">
        No activity yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {filteredActivities.map((activity, index) => {
        const isLast = index === activities.length - 1;

        switch (activity.type) {
          case TaskActivityType.COMMENT_ADDED:
            return (
              <ActivityComment
                key={activity.id}
                userName={activity.user.name}
                createdAt={activity.createdAt}
                content={activity.content ?? ""}
                isLast={isLast}
              />
            );

          case TaskActivityType.STATUS_CHANGE:
            return (
              <ActivityAction
                key={activity.id}
                createdAt={activity.createdAt}
                isLast={isLast}
              >
                <span className="font-semibold">{activity.user.name}</span>{" "}
                <span className="text-muted-foreground">changed status to</span>{" "}
                {activity.newValue && (
                  <TaskStatusBadge
                    status={activity.newValue as TaskStatus}
                    className="scale-90"
                  />
                )}
              </ActivityAction>
            );

          case TaskActivityType.PRIORITY_CHANGE:
            return (
              <ActivityAction
                key={activity.id}
                createdAt={activity.createdAt}
                isLast={isLast}
              >
                <span className="font-semibold">{activity.user.name}</span>{" "}
                <span className="text-muted-foreground">
                  changed priority to
                </span>{" "}
                {activity.newValue && (
                  <TaskPriorityBadge
                    priority={activity.newValue as TaskPriority}
                    variant="badge"
                    className="scale-90"
                  />
                )}
              </ActivityAction>
            );

          case TaskActivityType.TASK_CREATED:
            return (
              <ActivityAction
                key={activity.id}
                createdAt={activity.createdAt}
                isLast={isLast}
              >
                <span className="text-muted-foreground">Task created by</span>{" "}
                <span className="font-semibold">{activity.user.name}</span>
              </ActivityAction>
            );

          case TaskActivityType.TASK_ARCHIVED:
            return (
              <ActivityAction
                key={activity.id}
                createdAt={activity.createdAt}
                isLast={isLast}
              >
                <span className="font-semibold">{activity.user.name}</span>{" "}
                <span className="text-muted-foreground">
                  archived this task
                </span>
              </ActivityAction>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
