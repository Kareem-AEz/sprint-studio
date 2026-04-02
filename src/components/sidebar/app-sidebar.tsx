"use client";

import { IconMagnifyingGlass, IconPlusSmall } from "central-icons";
import { useCallback, useRef } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Label } from "../ui/label";
import { NavGroup } from "./components/nav-group";
import { UserFooter } from "./components/user-footer";
import { WorkspaceHeader } from "./components/workspace-header";
import { SIDEBAR_CONFIG } from "./constants";

export function AppSidebar() {
  const { setOpen, open, isMobile } = useSidebar();
  /** `true` = sidebar was expanded before this hover; `false` = was icon-collapsed; `null` = not hovering */
  const wasExpandedBeforeHover = useRef<boolean | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    wasExpandedBeforeHover.current = open;
    if (!open) setOpen(true);
  }, [isMobile, open, setOpen]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    if (wasExpandedBeforeHover.current === false) {
      setOpen(false);
    }
    wasExpandedBeforeHover.current = null;
  }, [isMobile, setOpen]);

  return (
    <div className="relative">
      <Sidebar
        variant="floating"
        collapsible="icon"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <WorkspaceHeader />

        <SidebarContent className="py-2">
          {/* SEARCH */}
          <SidebarGroup className="py-0 group-data-[collapsible=icon]:hidden">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <SidebarInput
                id="search"
                placeholder="Search..."
                className="rounded-lg pl-8"
              />
              <IconMagnifyingGlass className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            </SidebarGroupContent>
          </SidebarGroup>

          {/* GENERAL */}
          <NavGroup label="General" items={SIDEBAR_CONFIG.general} />

          <SidebarSeparator className="mx-0 w-full" />

          {/* PROJECTS */}
          <NavGroup
            label="Projects"
            items={SIDEBAR_CONFIG.projects}
            action={{
              icon: <IconPlusSmall />,
              title: "Add Project",
            }}
          />
        </SidebarContent>

        <SidebarSeparator className="mx-0 w-full" />

        {/* FOOTER: User Menu */}
        <UserFooter />
      </Sidebar>

      <div className="absolute top-0 right-0 flex translate-x-full translate-y-1/2 items-center justify-center">
        <SidebarTrigger />
      </div>
    </div>
  );
}
