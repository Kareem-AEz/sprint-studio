import { UserAvatar } from "@/features/auth/components/user-avatar";
import { getMe } from "@/features/auth/queries/get-me";
import { Task } from "../../queries/types";
import { formatDate } from "../../utils/format";
import { TaskCategoryBadge } from "../badges/task-category-badge";
import { TaskPriorityBadge } from "../badges/task-priority-badge";
import { TaskStatusBadge } from "../badges/task-status-badge";

type TaskDetailsSidebarProps = {
  task: Task;
};

export async function TaskDetailsSidebar({ task }: TaskDetailsSidebarProps) {
  const me = await getMe();
  return (
    <div className="flex flex-1 flex-col gap-12 border-l p-4 pt-0">
      {/* Task Details Sidebar Header */}
      <h3 className="border-b py-8 text-lg font-medium">Task Details</h3>

      {/* Task Details Sidebar Content */}
      <div className="flex flex-col gap-8 border-b pb-8">
        {/* Status */}
        <div className="flex flex-col gap-2">
          <h4 className="text-muted-foreground text-sm font-medium">Status</h4>
          <p className="text-muted-foreground text-sm">
            <TaskStatusBadge status={task.status} />
          </p>
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-2">
          <h4 className="text-muted-foreground text-sm font-medium">
            Priority
          </h4>
          <p className="text-muted-foreground text-sm">
            <TaskPriorityBadge priority={task.priority} variant="badge" />
          </p>
        </div>

        {/* Assignees */}
        <div className="flex flex-col gap-2">
          <h4 className="text-muted-foreground text-sm font-medium">
            Assignees
          </h4>
          <div className="flex flex-col gap-2">
            {task.assignees.map((assignee) => (
              <div key={assignee.id} className="flex items-center gap-2">
                <UserAvatar name={assignee.name} />
                <span className="text-muted-foreground text-sm">
                  {assignee.name}
                </span>
                {assignee.id === me?.id && (
                  <span className="text-primary font-mono text-xs select-none">
                    [You]
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <h4 className="text-muted-foreground text-sm font-medium">
            Category
          </h4>
          <p className="text-muted-foreground text-sm">
            <TaskCategoryBadge categoryName={task.category.name} />
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between">
          <h4 className="text-muted-foreground/60 text-sm font-medium">
            Start Date
          </h4>
          <span className="text-muted-foreground">
            {formatDate({ date: task.startDate, mode: "long" })}
          </span>
        </div>
        <div className="flex flex-col justify-between">
          <h4 className="text-muted-foreground/60 text-sm font-medium">
            Due Date
          </h4>
          <span className="text-muted-foreground">
            {formatDate({ date: task.dueDate, mode: "long" })}
          </span>
        </div>
        <div className="flex flex-col justify-between">
          <h4 className="text-muted-foreground/60 text-sm font-medium">
            Created
          </h4>
          <span className="text-muted-foreground">
            {formatDate({ date: task.createdAt, mode: "long" })}
          </span>
        </div>
        <div className="flex flex-col justify-between">
          <h4 className="text-muted-foreground/60 text-sm font-medium">
            Updated
          </h4>
          <span className="text-muted-foreground">
            {formatDate({ date: task.updatedAt, mode: "long" })}
          </span>
        </div>
      </div>
    </div>
  );
}
