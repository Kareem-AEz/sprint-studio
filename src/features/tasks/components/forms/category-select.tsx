"use client";

import {
  IconChevronGrabberVertical,
  IconCircleCheck,
  IconPlusSmall,
} from "central-icons";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CategorySelect({
  categories,
  value,
  onChange,
  placeholder = "Select category",
  className,
}: CategorySelectProps) {
  const [search, setSearch] = React.useState("");
  const selectedCategory = categories.find((c) => c.id === value);
  const displayValue = selectedCategory ? selectedCategory.name : value;

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const showCreate =
    search.length > 0 &&
    !categories.some((c) => c.name.toLowerCase() === search.toLowerCase());

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="bg-input/50 dark:bg-input/50 hover:bg-input/70 w-full justify-between rounded-lg border-transparent"
          >
            {displayValue || (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <IconChevronGrabberVertical className="size-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 rounded-lg p-2" align="start">
          <Input
            placeholder="Search or create category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-input/50 border-input mb-2"
          />
          <div className="flex max-h-60 flex-col gap-1 overflow-y-auto">
            {filteredCategories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onSelect={() => {
                  onChange(category.id);
                  setSearch("");
                }}
                className="flex cursor-pointer items-center justify-between rounded-xl"
              >
                {category.name}
                {value === category.id && (
                  <IconCircleCheck className="size-4" />
                )}
              </DropdownMenuItem>
            ))}

            {showCreate && (
              <DropdownMenuItem
                onSelect={() => {
                  onChange(search);
                  setSearch("");
                }}
                className="text-primary focus:text-primary flex cursor-pointer items-center gap-2 rounded-xl"
              >
                <IconPlusSmall className="size-4" />
                Create &quot;{search}&quot;
              </DropdownMenuItem>
            )}

            {filteredCategories.length === 0 && !showCreate && (
              <div className="text-muted-foreground p-2 text-center text-sm">
                No results found
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
