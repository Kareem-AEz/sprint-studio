import { Badge } from "@/components/ui/badge";
import { getCategoryColor } from "@/lib/colors";
import { cn } from "@/lib/utils";

interface TaskCategoryBadgeProps {
  categoryName: string;
  className?: string;
}

export function TaskCategoryBadge({
  categoryName,
  className,
}: TaskCategoryBadgeProps) {
  const categoryColor = getCategoryColor(categoryName);

  return (
    <Badge
      variant="outline"
      className={cn(
        "border-(--cat-border) bg-(--cat-bg) font-mono text-sm text-(--cat-text) dark:border-(--cat-border-dark) dark:bg-(--cat-bg-dark) dark:text-(--cat-text-dark)",
        className,
      )}
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
      {categoryName}
    </Badge>
  );
}
