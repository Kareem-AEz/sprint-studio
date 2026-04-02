import { MotionConfig } from "motion/react";
import { Header } from "@/components/navigation/header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      transition={{ type: "spring", duration: 0.481, bounce: 0.08 }}
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </MotionConfig>
  );
}
