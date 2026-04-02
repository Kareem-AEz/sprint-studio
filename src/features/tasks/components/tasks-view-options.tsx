"use client";

import {
  IconAlignmentLeftBar,
  IconCalendar2,
  IconElectrocardiogram,
  IconLayoutWindow,
  IconListBullets,
} from "central-icons";
import { motion } from "motion/react";
import { useQueryState } from "nuqs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { TASKS_VIEW_OPTIONS_LABELS, TasksViewOption } from "../lib/constants";
import { tasksSearchParams } from "../lib/search-params";

const VIEW_ICONS: Record<TasksViewOption, React.ReactNode> = {
  List: <IconListBullets className="size-5" />,
  Board: <IconLayoutWindow className="size-5" />,
  Calendar: <IconCalendar2 className="size-5" />,
  Timeline: <IconAlignmentLeftBar className="size-5" />,
  Activity: <IconElectrocardiogram className="size-5" />,
} as const;

export const TASKS_VIEW_OPTIONS = TASKS_VIEW_OPTIONS_LABELS.map((label) => ({
  label,
  icon: VIEW_ICONS[label],
}));

export function TasksViewOptions({ className }: { className?: string }) {
  const [view, setView] = useQueryState("view", tasksSearchParams.view);
  const { toast } = useToast();

  const handleClick = (label: TasksViewOption) => {
    setView(label);
    toast.success(
      <div className="flex items-center gap-2">
        <span>View changed to</span>
        <Badge variant={"outline"} className="font-mono tracking-wider">
          {label}
        </Badge>
      </div>,
      {
        duration: 1000,
        key: label,
      },
    );
  };

  return (
    <div className={cn("flex min-w-0 items-center md:gap-2", className)}>
      {TASKS_VIEW_OPTIONS.map((option) => {
        const isActive = view === option.label;

        return (
          <div key={option.label} className="relative">
            <Button
              variant="ghost"
              className={cn(
                "text-muted-foreground font-mono text-xs tracking-wider",
                isActive && "text-primary hover:text-primary",
              )}
              onClick={() => handleClick(option.label)}
            >
              {option.icon}
              <span>{option.label}</span>
            </Button>

            {isActive && (
              <motion.div
                className="bg-primary absolute right-0 bottom-0 left-0 h-0.5"
                layoutId="active-view-option"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
