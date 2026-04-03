import {
  IconArchive1,
  IconArrowBoxLeft,
  IconCalender5,
  IconExclamationTriangle,
  IconInboxEmpty,
  IconKanbanView,
  IconLayoutDashboard,
  IconMap,
  IconTag,
  IconTodos,
} from "central-icons";
import { PATHS } from "@/lib/paths";

export const SIDEBAR_CONFIG = {
  user: {
    name: "Sarah Chen",
    email: "sarah@eng.co",
    avatar: "SC",
  },
  workspace: {
    name: "Eng Tasks",
    description: "Engineering Team",
    logo: "E",
  },
  general: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <IconLayoutDashboard />,
      isUnderDev: true,
    },
    {
      title: "My Tasks",
      url: "/tasks",
      icon: <IconTodos />,
      isUnderDev: true,
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: <IconInboxEmpty />,
      isUnderDev: true,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: <IconCalender5 />,
      isUnderDev: true,
    },
    {
      title: "Test Errors",
      url: PATHS.TEST_ERROR.href(),
      icon: <IconExclamationTriangle />,
    },
  ],
  projects: [
    {
      title: "Sprint Board",
      url: PATHS.TASKS.href(),
      icon: <IconKanbanView />,
      isActive: true,
    },
    {
      title: "Backlog",
      url: "/projects/backlog",
      icon: <IconArchive1 />,
      isUnderDev: true,
    },
    {
      title: "Roadmap",
      url: "/projects/roadmap",
      icon: <IconMap />,
      isUnderDev: true,
    },
    {
      title: "Releases",
      url: "/projects/releases",
      icon: <IconTag />,
      isUnderDev: true,
    },
  ],
  actions: [
    {
      title: "Log out",
      icon: <IconArrowBoxLeft />,
      action: "logout",
    },
  ],
};
