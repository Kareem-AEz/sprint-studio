import { getActivitiesById } from "./get-activities-by-id";

export type Activity = Awaited<ReturnType<typeof getActivitiesById>>[number];
