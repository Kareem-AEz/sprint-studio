import {
  IconArchive,
  IconDotGrid1x3VerticalTight,
  IconFlag2,
  IconPencil,
} from "central-icons";
import Link from "next/link";
import { AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { TaskPriority } from "@/generated/prisma/enums";
import { getCategoryColor } from "@/lib/colors";
import { PATHS } from "@/lib/paths";
import { cn } from "@/lib/utils";
import { formatDisplayValue } from "../utils/format";

interface TaskItemProps {
  task: Task;
}

const PRIORITY_ICONS: Record<TaskPriority, React.ReactNode> = {
  LOW: <IconFlag2 className="size-5 text-slate-400" />,
  MEDIUM: <IconFlag2 className="size-5 text-amber-500" />,
  HIGH: <IconFlag2 className="size-5 text-orange-500" />,
  URGENT: <IconFlag2 className="size-5 text-red-500" />,
};

const MAX_ASSIGNEE_AVATARS = 3;

export function TaskItem({ task }: TaskItemProps) {
  const assignees =
    task.assignees.length > MAX_ASSIGNEE_AVATARS
      ? task.assignees.slice(0, MAX_ASSIGNEE_AVATARS)
      : task.assignees;
  const remainingAssignees = task.assignees.length - assignees.length;
  const hasRemainingAssignees = remainingAssignees > 0;

  const categoryColor = getCategoryColor(task.category.name);

  return (
    <TableRow className="group relative">
      {/* Task Icon */}
      <TableCell className="w-14 px-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded text-sm font-bold">
            {task.taskKey.split("-")[0].charAt(0)}
          </div>
        </div>
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
        <div className="flex items-center justify-start gap-2">
          {PRIORITY_ICONS[task.priority]}
          <span className="font-mono text-sm">
            {formatDisplayValue(task.priority)}
          </span>
        </div>
      </TableCell>

      {/* Start Date */}
      <TableCell className="w-[160px] px-4 text-center">
        <span className="text-muted-foreground text-sm">
          {task.startDate
            ? task.startDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "--"}
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
          {/* TODO: Use date-fns to format the date */}
          {task.dueDate
            ? task.dueDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "--"}
        </span>
      </TableCell>

      {/* Category */}
      <TableCell className="w-[140px] px-4 text-center">
        <Badge
          variant="outline"
          className="border-(--cat-border) bg-(--cat-bg) font-mono text-sm text-(--cat-text) dark:border-(--cat-border-dark) dark:bg-(--cat-bg-dark) dark:text-(--cat-text-dark)"
          style={
            {
              "--cat-bg": categoryColor.light.bg,
              "--cat-text": categoryColor.light.text,
              "--cat-border": categoryColor.light.border,
              "--cat-bg-dark": categoryColor.dark.bg,
              "--cat-text-dark": categoryColor.dark.text,
              "--cat-border-dark": categoryColor.dark.border,
            } as React.CSSProperties
          }
        >
          {task.category.name}
        </Badge>
      </TableCell>

      {/* Task Actions */}
      <TableCell className="relative z-10 w-12 px-4 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 opacity-0 group-hover:opacity-100"
            >
              <IconDotGrid1x3VerticalTight className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link href={PATHS.TASK_EDIT.href(task.id)}>
                  <IconPencil className="size-4" />
                  Edit Task
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant="destructive"
                size="sm"
                className="w-full justify-start"
              >
                <IconArchive className="size-4" />
                Archive Task
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
