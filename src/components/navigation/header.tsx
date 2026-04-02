"use client";

import {
  IconBell2,
  IconMagnifyingGlass,
  IconSettingsGear1,
} from "central-icons";
import ThemeSwitcher from "@/components/theme/theme-switcher";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserAvatar } from "@/features/auth/components/user-avatar";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function Header() {
  const { user, isLoading } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
      <div className="flex items-center justify-center gap-2">
        <SidebarTrigger className="-ml-1" />

        {/* Breadcrumbs will be added to each page for dynamic navigation, including support for [taskKey]. */}
        {/* <Separator orientation="vertical" className="my-auto mr-2 h-4" />
        <Breadcrumbs /> */}
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden lg:block">
          <IconMagnifyingGlass className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <div className="bg-muted/50 border-input hover:bg-muted flex h-9 w-64 items-center justify-between rounded-md border px-3 py-1 pl-9 text-sm transition-colors">
            <span className="text-muted-foreground">Search tasks...</span>
            <kbd className="bg-background text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
              <span className="text-xs">Ctrl</span>K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              aria-label="Notifications"
            >
              <IconBell2 className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              aria-label="Settings"
            >
              <IconSettingsGear1 className="size-5" />
            </Button>
          </div>
          <ThemeSwitcher />
        </div>

        {
          <UserAvatar
            name={user?.name ?? null}
            isLoading={isLoading}
            className="size-8"
          />
        }
      </div>
    </header>
  );
}
