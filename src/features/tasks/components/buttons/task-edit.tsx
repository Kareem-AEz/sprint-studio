import { IconPencil } from "central-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/lib/paths";
import { cn } from "@/lib/utils";

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
  className?: string;
}

export function TaskEdit({
  taskId,
  variant = "ghost",
  size = "sm",
  className,
}: TaskEditProps) {
  return (
    <Button variant={variant} size={size} asChild className={cn(className)}>
      <Link href={PATHS.TASK_EDIT.href(taskId)}>
        <IconPencil className="size-4" />
        Edit Task
      </Link>
    </Button>
  );
}
