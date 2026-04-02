"use client";

import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  url: string;
  icon: React.ReactNode;
  isActive?: boolean;
  isUnderDev?: boolean;
}

interface NavGroupProps {
  label: string;
  items: NavItem[];
  action?: {
    icon: React.ReactNode;
    title: string;
    onClick?: () => void;
  };
}

export function NavGroup({ label, items, action }: NavGroupProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="uppercase group-data-[collapsible=icon]:hidden">
        {label}
      </SidebarGroupLabel>
      {action && (
        <SidebarGroupAction title={action.title} onClick={action.onClick}>
          {action.icon}
          <span className="sr-only">{action.title}</span>
        </SidebarGroupAction>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const button = (
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                disabled={item.isUnderDev}
                className={cn(
                  item.isActive
                    ? "bg-sidebar-primary/15! text-sidebar-primary! hover:bg-sidebar-primary/20! hover:text-sidebar-primary! font-medium!"
                    : "text-muted-foreground",
                  item.isUnderDev &&
                    "hover:text-muted-foreground active:text-muted-foreground cursor-not-allowed bg-transparent opacity-40 hover:bg-transparent active:bg-transparent",
                )}
              >
                {item.isUnderDev ? (
                  <div className="flex items-center gap-2 select-none">
                    <span className="flex aspect-square items-center justify-center">
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                  </div>
                ) : (
                  <Link href={item.url} className="flex items-center gap-2">
                    <span className="flex aspect-square items-center justify-center">
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                  </Link>
                )}
              </SidebarMenuButton>
            );

            if (item.isUnderDev) {
              return (
                <SidebarMenuItem key={item.title}>
                  <Tooltip disableHoverableContent>
                    <TooltipTrigger asChild>{button}</TooltipTrigger>
                    <TooltipContent side={"right"} align="center">
                      Under Development
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              );
            }

            return <SidebarMenuItem key={item.title}>{button}</SidebarMenuItem>;
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
