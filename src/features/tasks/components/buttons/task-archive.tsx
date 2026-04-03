"use client";

import { IconArchive, IconArchive1 } from "central-icons";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PATHS } from "@/lib/paths";
import { EMPTY_ACTION_STATE } from "@/response/action-state";
import { useActionFeedback } from "@/response/hooks/use-action-feedback";
import { archiveTask } from "../../actions/archive-task";

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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [actionState, formAction, isPending] = useActionState(
    archiveTask.bind(null, taskId),
    EMPTY_ACTION_STATE,
  );

  useActionFeedback(actionState, {
    onSuccess: () => {
      toast.success("Task archived successfully");
      setIsOpen(false);
      router.push(PATHS.TASKS.href());
    },
    onError: ({ actionState }) => {
      toast.error(actionState.message ?? "Failed to archive task");
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size={size}>
          <IconArchive className="size-4" />
          Archive Task
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="mx-auto max-w-xs">
        <form action={formAction}>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive Task</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently archive this
              task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex items-center justify-center gap-2">
            <AlertDialogCancel asChild>
              <Button
                type="button"
                variant="outline"
                size={size}
                disabled={isPending}
              >
                Cancel
              </Button>
            </AlertDialogCancel>

            <Button
              type="submit"
              variant={variant}
              size={size}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner className="size-4" />
                  Archiving...
                </>
              ) : (
                <>
                  <IconArchive1 className="size-4" />
                  Archive Task
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
