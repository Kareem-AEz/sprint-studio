"use client";

import { IconChevronGrabberVertical, IconCrossSmall } from "central-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/features/auth/components/user-avatar";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
}

interface AssigneeSelectProps {
  users: User[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function AssigneeSelect({
  users,
  value,
  onChange,
  placeholder = "Select assignees",
  className,
}: AssigneeSelectProps) {
  const selectedUsers = users.filter((user) => value.includes(user.id));

  const handleToggle = (userId: string) => {
    const newValue = value.includes(userId)
      ? value.filter((id) => id !== userId)
      : [...value, userId];
    onChange(newValue);
  };

  const handleRemove = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((id) => id !== userId));
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="bg-input/50 dark:bg-input/50 hover:bg-input/70 h-auto min-h-9 w-full justify-between rounded-lg border-transparent px-3 py-2"
          >
            <div className="flex flex-wrap items-center gap-1.5 overflow-hidden text-left">
              {selectedUsers.length > 0 ? (
                selectedUsers.map((user) => (
                  <Badge
                    key={user.id}
                    variant="secondary"
                    className="bg-background/50 hover:bg-background/80 flex h-7 items-center gap-1.5 rounded-full border-none py-0 pr-2 pl-1 transition-colors"
                  >
                    <UserAvatar name={user.name} className="size-5" />

                    <span className="text-xs font-medium">{user.name}</span>
                    <IconCrossSmall
                      className="size-3 cursor-pointer opacity-60 transition-opacity hover:opacity-100"
                      onClick={(e) => handleRemove(user.id, e)}
                    />
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground ml-1">
                  {placeholder}
                </span>
              )}
            </div>
            <IconChevronGrabberVertical className="size-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="max-h-72 w-64 overflow-y-auto rounded-lg p-1"
          align="start"
        >
          {users.map((user) => (
            <DropdownMenuCheckboxItem
              key={user.id}
              checked={value.includes(user.id)}
              onCheckedChange={() => handleToggle(user.id)}
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-3 rounded-lg py-2"
            >
              <UserAvatar
                name={user.name}
                className="size-7"
                textClassName="text-xs"
              />
              <span className="flex-1 truncate">{user.name}</span>
            </DropdownMenuCheckboxItem>
          ))}
          {users.length === 0 && (
            <div className="text-muted-foreground p-4 text-center text-sm">
              No users found
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
