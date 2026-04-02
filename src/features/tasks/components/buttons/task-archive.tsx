import { IconArchive } from "central-icons";
import { Button } from "@/components/ui/button";

interface TaskArchiveProps {
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

export function TaskArchive({
  taskId,
  variant = "destructive",
  size = "sm",
}: TaskArchiveProps) {
  return (
    <Button variant={variant} size={size}>
      <IconArchive className="size-4" />
      Archive Task
    </Button>
  );
}
