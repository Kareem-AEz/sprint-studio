import { IconPencil } from "central-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/lib/paths";

interface TaskEditProps {
  taskId: string;
}

export function TaskEdit({ taskId }: TaskEditProps) {
  return (
    <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
      <Link href={PATHS.TASK_EDIT.href(taskId)}>
        <IconPencil className="size-4" />
        Edit Task
      </Link>
    </Button>
  );
}
