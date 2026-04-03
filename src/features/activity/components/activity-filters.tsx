"use client";

import { useQueryStates } from "nuqs";
import { startTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  ACTIVITY_OPTIONS,
  activitySearchParams,
  ActivityType,
} from "../lib/search-params";

export function ActivityFilters() {
  const [queryParams, setQueryParams] = useQueryStates(activitySearchParams);
  const { toast } = useToast();

  const handleClick = (option: ActivityType) => {
    // The toast is shown before the query params are updated, because it's smart enough to detect duplicates.
    toast.success(
      <div className="flex items-center gap-2">
        <span>Activity type changed to</span>
        <Badge variant={"outline"} className="font-mono tracking-wider">
          {option}
        </Badge>
      </div>,
      {
        key: option,
      },
    );
    const { type: currentType } = queryParams;
    if (currentType === option) {
      return;
    }

    startTransition(() => {
      setQueryParams({ type: option });
    });
  };

  return (
    <div className="flex items-center gap-2">
      {ACTIVITY_OPTIONS.map((option) => {
        const isActive = queryParams.type === option;

        return (
          <Button
            key={option}
            variant={isActive ? "default" : "outline"}
            size={"sm"}
            onClick={() => handleClick(option)}
            className={cn(
              "text-muted-foreground font-mono text-xs tracking-wider",
              isActive && "text-background",
            )}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
}
