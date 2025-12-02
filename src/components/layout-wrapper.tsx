"use client";

import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuthSync } from "@/hooks/use-auth-sync";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith("/login") || pathname?.startsWith("/signup");

  if (!isAuthPage) {
    useAuthSync();
  }
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <SidebarTrigger className="absolute top-4 left-4" />
      <AppSidebar />

      <SidebarInset>
        <SidebarTrigger className="absolute top-4 left-4" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
