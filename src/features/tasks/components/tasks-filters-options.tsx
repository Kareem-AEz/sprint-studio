"use client";

import {
  IconEyeOpen,
  IconFilter1,
  IconSettingsSliderThree,
  IconUserGroup,
} from "central-icons";
import { Button } from "@/components/ui/button";
import { TasksFilters } from "./tasks-filters";

const FILTER_OPTIONS = [
  {
    label: "Group: Status",
    icon: <IconSettingsSliderThree className="size-5" />,
    component: null,
  },
  {
    label: "Filters",
    icon: <IconFilter1 className="size-5" />,
    component: <TasksFilters />,
  },
  {
    label: "Asignees",
    icon: <IconUserGroup className="size-5" />,
    component: null,
  },
  {
    label: "Show Closed",
    icon: <IconEyeOpen className="size-5" />,
    component: null,
  },
] as const;

export function TaskFiltersOptions() {
  return (
    <div className="flex items-center gap-2">
      {FILTER_OPTIONS.map((option) => {
        let component;
        if (option.component) {
          component = option.component;
        } else {
          component = (
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground hidden font-mono text-xs tracking-wider lg:flex"
              disabled={true}
            >
              {option.icon}
              <span>{option.label}</span>
            </Button>
          );
        }

        return (
          <div key={option.label} className="relative">
            {component}
          </div>
        );
      })}
    </div>
  );
}
