import { getTaskById } from "./get-task-by-id";
import { getTasks } from "./get-tasks";

export type Task = Awaited<ReturnType<typeof getTasks>>[number];
export type TaskById = Awaited<ReturnType<typeof getTaskById>>;
