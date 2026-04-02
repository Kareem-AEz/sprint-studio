import { IconFilter1 } from "central-icons";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterForm } from "./forms/filter-form";

export function TasksFilters() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="text-muted-foreground font-mono text-sm tracking-wider"
        >
          <IconFilter1 className="size-5" />
          <span>Tasks Filters</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Tasks Filters</PopoverTitle>
        </PopoverHeader>
        <FilterForm />
      </PopoverContent>
    </Popover>
  );
}
