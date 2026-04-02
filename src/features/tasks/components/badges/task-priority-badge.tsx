import { IconFlag2 } from "central-icons";
import { Badge } from "@/components/ui/badge";
import { TaskPriority } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { formatDisplayValue } from "../../utils/format";

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
  className?: string;
  showIcon?: boolean;
  variant?: "badge" | "inline";
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
  variant = "inline",
}: TaskPriorityBadgeProps) {
  const config = PRIORITY_CONFIG[priority];

  if (variant === "badge") {
    return (
      <Badge
        variant="outline"
        className={cn(
          "flex items-center gap-2 rounded-md px-2 py-1 font-normal shadow-none",
          className,
        )}
      >
        {showIcon && <IconFlag2 className={cn("size-4", config.iconColor)} />}
        <span className="text-sm">{formatDisplayValue(priority)}</span>
      </Badge>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && <IconFlag2 className={cn("size-5", config.iconColor)} />}
      <span className="text-foreground font-mono text-sm">
        {formatDisplayValue(priority)}
      </span>
    </div>
  );
}
