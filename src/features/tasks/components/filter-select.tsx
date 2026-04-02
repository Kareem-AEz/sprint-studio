"use client";

import { IconSettingsSliderThree } from "central-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDisplayValue } from "../utils/format";

interface FilterSelectProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

/**
 * A reusable dropdown for selecting filters.
 * Integrates with the project's styling and nuqs-based state.
 */
export function FilterSelect({
  label,
  value,
  options,
  onChange,
  icon = <IconSettingsSliderThree className="size-5" />,
}: FilterSelectProps) {
  const displayValue = formatDisplayValue(value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-muted-foreground font-mono text-sm tracking-wider"
        >
          {icon}
          <span className="flex items-center gap-1">
            {label}: <span className="text-foreground">{displayValue}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="font-mono text-[10px] tracking-tighter uppercase opacity-50">
          Select {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem
              key={option}
              value={option}
              className="capitalize"
            >
              {formatDisplayValue(option)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
