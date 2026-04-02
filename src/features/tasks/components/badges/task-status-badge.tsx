import { Badge } from "@/components/ui/badge";
import { TaskStatus } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { formatDisplayValue } from "../../utils/format";

interface TaskStatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const STATUS_CONFIG: Record<TaskStatus, { color: string; bgColor: string }> = {
  BACKLOG: { color: "text-slate-500", bgColor: "bg-slate-500/10" },
  IN_PROGRESS: { color: "text-blue-500", bgColor: "bg-blue-500/10" },
  BLOCKED: { color: "text-red-500", bgColor: "bg-red-500/10" },
  DONE: { color: "text-green-500", bgColor: "bg-green-500/10" },
};

export function TaskStatusBadge({ status, className }: TaskStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge
      variant="outline"
      className={cn(
        "border-transparent font-semibold tracking-wide uppercase",
        config.bgColor,
        config.color,
        className,
      )}
    >
      {formatDisplayValue(status)}
    </Badge>
  );
}
