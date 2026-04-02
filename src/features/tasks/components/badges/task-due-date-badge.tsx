import { IconCalender5 } from "central-icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TaskDueDateBadgeProps {
  dueDate: Date | null;
  className?: string;
}

export function TaskDueDateBadge({
  dueDate,
  className,
}: TaskDueDateBadgeProps) {
  if (!dueDate) return null;

  const formattedDate = dueDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Badge
      variant="outline"
      className={cn(
        "flex items-center gap-2 rounded-md border-slate-200 bg-white px-2 py-1 font-normal text-slate-700 shadow-none hover:bg-white",
        className,
      )}
    >
      <IconCalender5 className="size-4 text-red-500" />
      <span className="text-sm">
        Due <span className="font-semibold">{formattedDate}</span>
      </span>
    </Badge>
  );
}
