import { Task } from "../../queries/types";
import { TaskArchive } from "../buttons/task-archive";
import { TaskEdit } from "../buttons/task-edit";
import { TaskIcon } from "../task-icon";

interface TaskDetailsHeaderProps {
  task: Task;
}

export function TaskDetailsHeader({ task }: TaskDetailsHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Task Icon, Task Key and Action Buttons */}
      <div className="flex items-center justify-between">
        {/* Task Icon and Task Key */}
        <div className="flex items-center gap-3">
          <TaskIcon taskKey={task.taskKey} />
          <span className="text-muted-foreground text-lg">{task.taskKey}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <TaskEdit taskId={task.id} variant="outline" size="default" />
          <TaskArchive taskId={task.id} variant="destructive" size="default" />
        </div>
      </div>

      {/* Task Title */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{task.title}</h1>
      </div>

      {/* Task Metadata */}
    </div>
  );
}
