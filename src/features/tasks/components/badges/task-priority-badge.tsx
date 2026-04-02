import { IconFlag2 } from "central-icons";
import { TaskPriority } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { formatDisplayValue } from "../../utils/format";

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
  className?: string;
  showIcon?: boolean;
}

const PRIORITY_CONFIG: Record<TaskPriority, { iconColor: string }> = {
  LOW: { iconColor: "text-slate-400" },
  MEDIUM: { iconColor: "text-amber-500" },
  HIGH: { iconColor: "text-orange-500" },
  URGENT: { iconColor: "text-red-500" },
};

export function TaskPriorityBadge({
  priority,
  className,
  showIcon = true,
}: TaskPriorityBadgeProps) {
  const config = PRIORITY_CONFIG[priority];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && <IconFlag2 className={cn("size-5", config.iconColor)} />}
      <span className="font-mono text-sm">{formatDisplayValue(priority)}</span>
    </div>
  );
}
