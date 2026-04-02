import { getTasks } from "../queries/get-tasks";
import { TasksEmptyState } from "./tasks-empty-state";
import { TasksList } from "./tasks-list";

export async function TasksTableContent() {
  const tasks = await getTasks();

  if (tasks.length === 0) {
    return <TasksEmptyState />;
  }

  return <TasksList tasks={tasks} />;
}
