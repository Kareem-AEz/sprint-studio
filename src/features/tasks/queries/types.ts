import { getTasks } from "./get-tasks";

export type Task = Awaited<ReturnType<typeof getTasks>>[number];
