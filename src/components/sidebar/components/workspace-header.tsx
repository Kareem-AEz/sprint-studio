import { IconChevronBottom } from "central-icons";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SIDEBAR_CONFIG } from "../constants";

export function WorkspaceHeader() {
  const { workspace } = SIDEBAR_CONFIG;

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              {workspace.logo}
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="truncate font-semibold">{workspace.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {workspace.description}
              </span>
            </div>
            <IconChevronBottom className="text-muted-foreground ml-auto size-4" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
