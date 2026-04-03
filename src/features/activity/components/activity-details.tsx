import { Suspense } from "react";
import { getActivitiesById } from "../queries/get-activities-by-id";
import { ActivityContent } from "./activity-content";
import { ActivityFilters } from "./activity-filters";
import { ActivityCommentForm } from "./forms/activity-comment-form";

type ActivityDetailsProps = {
  taskId: string;
};

/**
 * The main container for activity details.
 * Handles data fetching and server-side filtering.
 */
export async function ActivityDetails({ taskId }: ActivityDetailsProps) {
  const activities = await getActivitiesById(taskId);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Activity</h2>

        <Suspense fallback={<div className="bg-muted h-6 w-24 rounded" />}>
          <ActivityFilters />
        </Suspense>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ActivityContent activities={activities} />
      </div>

      <div>
        <ActivityCommentForm taskId={taskId} />
      </div>
    </div>
  );
}
