"use client";

import { useEffect } from "react";
import { TaskError } from "@/features/tasks/components/task-error";

export default function TaskErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <TaskError error={error} reset={reset} />;
}
