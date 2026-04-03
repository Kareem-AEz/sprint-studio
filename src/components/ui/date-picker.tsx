"use client";

import { IconCalendar1 } from "central-icons";
import { format } from "date-fns";
import { RefObject, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string;
  ref?: RefObject<DatePickerImperativeHandle | null>;
};

export type DatePickerImperativeHandle = {
  reset: () => void;
};

export function DatePicker({ id, name, defaultValue, ref }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined,
  );
  const [open, setOpen] = useState(false);

  const formattedDate = date ? (
    format(date, "yyyy-MM-dd")
  ) : (
    <span>Pick a deadline</span>
  );

  const handleSelect = (date: Date | undefined) => {
    setDate(date);
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    reset: () => setDate(undefined),
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id={id} asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
        >
          <IconCalendar1 className="size-4" />
          {formattedDate}
          <input
            type="hidden"
            name={name}
            value={date ? format(date, "yyyy-MM-dd") : ""}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={{
            from: date,
            to: date,
          }}
          disabled={{ before: new Date() }}
          onSelect={(range) => {
            setDate(range?.from ?? undefined);
            setOpen(false);
          }}
          showOutsideDays
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
}
