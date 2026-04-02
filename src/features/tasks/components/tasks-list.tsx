import { IconDotGrid1x3VerticalTight, IconPlusSmall } from "central-icons";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/features/tasks/queries/types";
import { TASK_STATUS_OPTIONS } from "../lib/constants";
import { TaskStatusBadge } from "./badges/task-status-badge";
import { TaskItem } from "./task-item";

interface TasksListProps {
  tasks: Task[];
}

export function TasksList({ tasks }: TasksListProps) {
  // Group tasks by status
  const groupedTasks = Object.groupBy(tasks, (task) => task.status);

  const statuses = TASK_STATUS_OPTIONS;

  return (
    <div className="flex flex-col gap-8">
      {statuses.map((status) => {
        const statusTasks = groupedTasks[status] ?? [];
        if (statusTasks.length === 0) return null;

        return (
          <div key={status} className="flex flex-col gap-2">
            {/* Status Header */}
            <div className="bg-muted flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <TaskStatusBadge status={status} />
                <span className="text-muted-foreground text-sm font-medium">
                  {statusTasks.length}
                </span>
              </div>

              {/* Task Header Actions */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="size-8" disabled>
                  <IconPlusSmall className="size-5" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8" disabled>
                  <IconDotGrid1x3VerticalTight className="size-4" />
                </Button>
              </div>
            </div>

            {/* Tasks Table */}
            <Table>
              <TableHeader>
                <TableRow className="border-none hover:bg-transparent">
                  {/* Task Icon */}
                  <TableHead className="w-14 px-4"></TableHead>

                  {/* Task Name */}
                  <TableHead className="min-w-[300px] px-4">Name</TableHead>

                  {/* Assignees */}
                  <TableHead className="w-[300px] px-4">Assignee</TableHead>

                  {/* Priority */}
                  <TableHead className="w-[140px] px-4 text-start">
                    Priority
                  </TableHead>

                  {/* Start Date */}
                  <TableHead className="w-[160px] px-4 text-center">
                    Start
                  </TableHead>

                  {/* Due Date */}
                  <TableHead className="w-[160px] px-4 text-center">
                    Due
                  </TableHead>

                  {/* Category */}
                  <TableHead className="w-[140px] px-4 text-center">
                    Category
                  </TableHead>

                  {/* Task Actions */}
                  <TableHead className="w-12 px-4"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statusTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
}
