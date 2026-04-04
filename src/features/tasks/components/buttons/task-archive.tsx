"use client";

import { IconArchive, IconArchive1 } from "central-icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { PATHS } from "@/lib/paths";
import { cn } from "@/lib/utils";
import { EMPTY_ACTION_STATE } from "@/response/action-state";
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
  className?: string;
}

export function TaskArchive({
  taskId,
  variant = "destructive",
  size = "sm",
  className,
}: TaskArchiveProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const isSuccessRef = useRef(false);
  const isMountedRef = useRef(true);
  const successMessageRef = useRef("Task archived successfully");

  // When the task is removed from the DOM (e.g. filtered out after revalidatePath),
  // this component unmounts. We trigger the toast here so it appears exactly
  // when the UI updates, creating a seamless experience.
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (isSuccessRef.current) {
        toast.success(successMessageRef.current, {
          key: "task-archived",
        });
      }
    };
  }, [toast]);

  const handleArchive = () => {
    startTransition(async () => {
      const result = await archiveTask(taskId, EMPTY_ACTION_STATE);
      if (result.status === "SUCCESS") {
        if (result.message) successMessageRef.current = result.message;
        isSuccessRef.current = true;
        setIsSuccess(true);
        
        if (pathname !== PATHS.TASKS.href()) {
          router.push(PATHS.TASKS.href());
        }

        // Safety fallback: If the Next.js transition takes too long or fails to unmount
        // the component, force close the dialog and show the toast anyway after 3 seconds.
        setTimeout(() => {
          if (isMountedRef.current && isSuccessRef.current) {
            setIsOpen(false);
            setIsSuccess(false);
            toast.success(successMessageRef.current, {
              key: "task-archived",
            });
            isSuccessRef.current = false; // Prevent double toast on later unmount
          }
        }, 3000);
      } else {
        toast.error(result.error ?? "Failed to archive task", {
          key: "task-archive-error",
        });
      }
    });
  };

  const isWorking = isPending || isSuccess;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size={size} className={cn(className)}>
          <IconArchive className="size-4" />
          Archive Task
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="mx-auto max-w-xs">
        <form action={handleArchive}>
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
                disabled={isWorking}
              >
                Cancel
              </Button>
            </AlertDialogCancel>

            <Button
              type="submit"
              variant={variant}
              size={size}
              disabled={isWorking}
            >
              {isWorking ? (
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
