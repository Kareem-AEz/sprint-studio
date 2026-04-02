import { IconPencil } from "central-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/lib/paths";

interface TaskEditProps {
  taskId: string;
  variant?: "ghost" | "outline" | "secondary" | "destructive" | "link";
  size?:
    | "xs"
    | "sm"
    | "lg"
    | "default"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
}

export function TaskEdit({
  taskId,
  variant = "ghost",
  size = "sm",
}: TaskEditProps) {
  return (
    <Button variant={variant} size={size} asChild>
      <Link href={PATHS.TASK_EDIT.href(taskId)}>
        <IconPencil className="size-4" />
        Edit Task
      </Link>
    </Button>
  );
}
