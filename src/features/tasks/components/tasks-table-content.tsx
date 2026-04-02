import { getTasks } from "../queries/get-tasks";
import { TasksList } from "./tasks-list";

export async function TasksTableContent() {
  const tasks = await getTasks();
  return <TasksList tasks={tasks} />;
}
