import { IconArchive } from "central-icons";
import { Button } from "@/components/ui/button";

interface TaskArchiveProps {
  taskId: string;
}

export function TaskArchive({ taskId }: TaskArchiveProps) {
  return (
    <Button variant="destructive" size="sm" className="w-full justify-start">
      <IconArchive className="size-4" />
      Archive Task
    </Button>
  );
}
