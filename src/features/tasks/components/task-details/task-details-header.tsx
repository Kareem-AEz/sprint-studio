import { Task } from "../../queries/types";
import { TaskCategoryBadge } from "../badges/task-category-badge";
import { TaskPriorityBadge } from "../badges/task-priority-badge";
import { TaskStatusBadge } from "../badges/task-status-badge";
import { TaskArchive } from "../buttons/task-archive";
import { TaskEdit } from "../buttons/task-edit";
import { TaskActions } from "../task-actions";
import { TaskIcon } from "../task-icon";
import { TaskDevUtils } from "./task-dev-utils";

interface TaskDetailsHeaderProps {
  task: Task;
}

export function TaskDetailsHeader({ task }: TaskDetailsHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Task Icon, Task Key and Action Buttons */}
      <div className="flex items-center justify-between">
        {/* Task Icon and Task Key */}
        <div className="flex items-center gap-3">
          <TaskIcon taskKey={task.taskKey} />
          <span className="text-muted-foreground text-lg">{task.taskKey}</span>
          <TaskDevUtils />
        </div>

        {/* Action Buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <TaskEdit taskId={task.id} variant="outline" size="sm" />
          <TaskArchive taskId={task.id} variant="destructive" size="sm" />
        </div>
        <div className="flex md:hidden">
          <TaskActions taskId={task.id} />
        </div>
      </div>

      {/* Task Title */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{task.title}</h1>
      </div>

      {/* Task Metadata */}
      <div className="flex gap-4">
        <TaskStatusBadge status={task.status} />
        <TaskPriorityBadge priority={task.priority} variant="badge" />
        <TaskCategoryBadge categoryName={task.category.name} />
      </div>
    </div>
  );
}
