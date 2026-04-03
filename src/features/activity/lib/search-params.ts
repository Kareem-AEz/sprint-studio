import { createSearchParamsCache, parseAsStringLiteral } from "nuqs/server";

export const ACTIVITY_OPTIONS = ["ALL", "COMMENT", "HISTORY"] as const;
export type ActivityType = (typeof ACTIVITY_OPTIONS)[number];

export const activitySearchParams = {
  type: parseAsStringLiteral<ActivityType>(ACTIVITY_OPTIONS).withDefault("ALL"),
};

export const activitySearchParamsCache =
  createSearchParamsCache(activitySearchParams);
