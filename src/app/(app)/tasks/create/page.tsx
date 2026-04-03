import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskFormLoader } from "@/features/tasks/components/forms/task-form-loader";
import { TaskFormSkeleton } from "@/features/tasks/components/forms/task-form-skeleton";

export default function CreateTaskPage() {
  return (
    <div className="flex flex-1 items-center justify-center py-10">
      <div className="container w-full max-w-lg">
        <Card className="rounded-3xl border-none bg-transparent shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Edit Task
            </CardTitle>
            <p className="text-muted-foreground">
              Make changes to your task details below.
            </p>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<TaskFormSkeleton />}>
              <TaskFormLoader />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
