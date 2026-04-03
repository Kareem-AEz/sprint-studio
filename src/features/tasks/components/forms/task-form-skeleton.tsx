import { Skeleton } from "@/components/ui/skeleton";

export function TaskFormSkeleton() {
  return (
    <div className="flex h-[600px] flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Title */}
        <div className="flex flex-col gap-3 md:col-span-2">
          <Skeleton className="h-3.5 w-12" />
          <Skeleton className="h-9 w-full rounded-3xl" />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3 md:col-span-2">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>

        {/* Category & Assignees */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-9 w-full rounded-3xl" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-9 w-full rounded-3xl" />
        </div>

        {/* Status & Priority */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-3.5 w-12" />
          <Skeleton className="h-9 w-full rounded-3xl" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-3.5 w-12" />
          <Skeleton className="h-9 w-full rounded-3xl" />
        </div>

        {/* Dates */}
        <div className="flex flex-col gap-3 md:col-span-2">
          <Skeleton className="h-3.5 w-12" />
          <Skeleton className="h-9 w-full rounded-3xl" />
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end pt-4">
        <Skeleton className="h-9 w-32 rounded-3xl" />
      </div>
    </div>
  );
}
