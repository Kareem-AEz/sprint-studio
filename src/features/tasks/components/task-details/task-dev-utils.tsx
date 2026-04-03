"use client";

import {
  IconExclamationTriangle,
  IconInboxEmpty,
  IconMagnifyingGlass,
  IconSettingsKnob,
} from "central-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TaskDevUtils() {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 hover:text-primary h-9 w-9 rounded-xl shadow-sm transition-all"
        >
          <IconSettingsKnob className="size-5" />
          <span className="sr-only">Development Utilities</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-2xl p-2 shadow-lg"
      >
        <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-[10px] font-bold tracking-widest uppercase">
          Simulate States
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx--2 my-1" />

        <DropdownMenuItem
          asChild
          className="focus:bg-primary/5 cursor-pointer rounded-lg"
        >
          <Link
            href={`${pathname}?simulate=not-found`}
            className="flex items-center gap-3 py-2"
          >
            <div className="flex size-7 items-center justify-center rounded-md bg-blue-500/10 text-blue-600">
              <IconMagnifyingGlass className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Trigger 404</span>
              <span className="text-muted-foreground font-mono text-[10px]">
                simulate=not-found
              </span>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="focus:bg-destructive/5 cursor-pointer rounded-lg"
        >
          <Link
            href={`${pathname}?simulate=error`}
            className="flex items-center gap-3 py-2"
          >
            <div className="bg-destructive/10 text-destructive flex size-7 items-center justify-center rounded-md">
              <IconExclamationTriangle className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Trigger Error</span>
              <span className="text-muted-foreground font-mono text-[10px]">
                simulate=error
              </span>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-lg focus:bg-orange-500/5"
        >
          <Link
            href={`${pathname}?simulate=empty`}
            className="flex items-center gap-3 py-2"
          >
            <div className="flex size-7 items-center justify-center rounded-md bg-orange-500/10 text-orange-600">
              <IconInboxEmpty className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Trigger Empty</span>
              <span className="text-muted-foreground font-mono text-[10px]">
                simulate=empty
              </span>
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
