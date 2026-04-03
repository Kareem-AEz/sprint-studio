import { IconDotGrid1x3VerticalTight } from "central-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskArchive } from "./buttons/task-archive";
import { TaskEdit } from "./buttons/task-edit";

interface TaskActionsProps {
  taskId: string;
}

export function TaskActions({ taskId }: TaskActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          aria-label="Task Actions"
        >
          <IconDotGrid1x3VerticalTight className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <TaskEdit taskId={taskId} className="w-full" />
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <TaskArchive taskId={taskId} className="w-full" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
