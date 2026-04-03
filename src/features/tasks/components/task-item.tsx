import { IconDotGrid1x3VerticalTight } from "central-icons";
import Link from "next/link";
import { AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserAvatar } from "@/features/auth/components/user-avatar";
import { Task } from "@/features/tasks/queries/types";
import { PATHS } from "@/lib/paths";
import { cn } from "@/lib/utils";
import { formatDate } from "../utils/format";
import { TaskCategoryBadge } from "./badges/task-category-badge";
import { TaskPriorityBadge } from "./badges/task-priority-badge";
import { TaskArchive } from "./buttons/task-archive";
import { TaskEdit } from "./buttons/task-edit";
import { TaskIcon } from "./task-icon";

interface TaskItemProps {
  task: Task;
}

const MAX_ASSIGNEE_AVATARS = 3;

export function TaskItem({ task }: TaskItemProps) {
  const assignees =
    task.assignees.length > MAX_ASSIGNEE_AVATARS
      ? task.assignees.slice(0, MAX_ASSIGNEE_AVATARS)
      : task.assignees;
  const remainingAssignees = task.assignees.length - assignees.length;
  const hasRemainingAssignees = remainingAssignees > 0;

  return (
    <TableRow className="group relative">
      {/* Task Icon */}
      <TableCell className="w-14 px-4">
        <TaskIcon taskKey={task.taskKey} />
      </TableCell>

      {/* Task Name */}
      <TableCell className="min-w-[300px] px-4">
        <div className="flex flex-col">
          <Link
            href={PATHS.TASK_DETAILS.href(task.id)}
            className="group-hover:text-primary text-sm font-medium transition-colors after:absolute after:inset-0"
          >
            {task.title}
          </Link>
          <span className="text-muted-foreground truncate text-[10px] uppercase">
            {task.taskKey}
          </span>
        </div>
      </TableCell>

      {/* Assignees */}
      <TableCell className="w-[300px] px-4">
        <div className="flex items-center">
          <AvatarGroup>
            {assignees.map((user) => {
              return <UserAvatar key={user.id} name={user.name} />;
            })}
          </AvatarGroup>
          {hasRemainingAssignees && (
            <div className="text-primary/50 flex size-8 shrink-0 items-center justify-start rounded">
              <span className="translate-x-1/4 text-xs font-bold">
                +{remainingAssignees}
              </span>
            </div>
          )}
        </div>
      </TableCell>

      {/* Priority */}
      <TableCell className="w-[140px] px-4 text-start">
        <TaskPriorityBadge priority={task.priority} />
      </TableCell>

      {/* Start Date */}
      <TableCell className="w-[160px] px-4 text-center">
        <span className="text-muted-foreground text-sm">
          {formatDate({ date: task.startDate })}
        </span>
      </TableCell>

      {/* Due Date */}
      <TableCell className="w-[160px] px-4 text-center">
        <span
          className={cn(
            "text-sm",
            task.dueDate && task.dueDate < new Date() && task.status !== "DONE"
              ? "font-medium text-red-500"
              : "text-muted-foreground",
          )}
        >
          {formatDate({ date: task.dueDate })}
        </span>
      </TableCell>

      {/* Category */}
      <TableCell className="w-[140px] px-4 text-center">
        <TaskCategoryBadge categoryName={task.category.name} />
      </TableCell>

      {/* Task Actions */}
      <TableCell className="relative z-10 w-12 px-4 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 opacity-0 group-hover:opacity-100"
              aria-label="Task Actions"
            >
              <IconDotGrid1x3VerticalTight className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <TaskEdit taskId={task.id} className="w-full" />
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <TaskArchive taskId={task.id} className="w-full" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
