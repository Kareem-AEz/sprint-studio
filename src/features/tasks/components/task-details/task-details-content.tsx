import { Task } from "../../queries/types";

interface TaskDetailsContentProps {
  task: Task;
}

export function TaskDetailsContent({ task }: TaskDetailsContentProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium">Description</h2>
      <p className="text-muted-foreground text-sm">{task.description}</p>
    </div>
  );
}
