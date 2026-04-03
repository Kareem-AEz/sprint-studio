import { Skeleton } from "@/components/ui/skeleton";

export function ActivitySkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-20" /> {/* "Activity" Title */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-14 rounded-md" /> {/* ALL */}
          <Skeleton className="h-8 w-20 rounded-md" /> {/* COMMENT */}
          <Skeleton className="h-8 w-18 rounded-md" /> {/* HISTORY */}
        </div>
      </div>

      {/* Activity List */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Comment Item */}
        <div className="relative flex gap-3 pb-8">
          <div className="bg-border/50 absolute bottom-0 left-[15.5px] top-9 w-[1.5px]" />
          <Skeleton className="size-8 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="h-16 w-full rounded-2xl" />
          </div>
        </div>

        {/* Action Item 1 */}
        <div className="relative flex gap-3 pb-8">
          <div className="bg-border/50 absolute bottom-0 left-[15.5px] top-5 w-[1.5px]" />
          <div className="flex size-8 shrink-0 items-center justify-center">
            <Skeleton className="size-2.5 rounded-full" />
          </div>
          <div className="flex flex-1 items-baseline gap-2 pt-1.5">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* Action Item 2 */}
        <div className="relative flex gap-3 pb-8">
          <div className="bg-border/50 absolute bottom-0 left-[15.5px] top-5 w-[1.5px]" />
          <div className="flex size-8 shrink-0 items-center justify-center">
            <Skeleton className="size-2.5 rounded-full" />
          </div>
          <div className="flex flex-1 items-baseline gap-2 pt-1.5">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* Action Item 3 (No vertical line) */}
        <div className="relative flex gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center">
            <Skeleton className="size-2.5 rounded-full" />
          </div>
          <div className="flex flex-1 items-baseline gap-2 pt-1.5">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </div>

      {/* Comment Form Wrapper */}
      <div>
        <div className="mt-auto flex flex-1 items-start gap-3">
          <Skeleton className="size-8 shrink-0 rounded-full" />
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-3.5 w-40" /> {/* Description */}
            </div>
            <div className="mt-2 flex justify-end">
              <Skeleton className="h-9 w-24 rounded-md" /> {/* Button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
