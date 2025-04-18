"use client";

import {
  SidebarProvider,
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Menu, Home, User, Settings, LogOut } from "lucide-react";

export default function SideBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <InnerLayout>{children}</InnerLayout>
    </SidebarProvider>
  );
}

function InnerLayout({ children }: { children: React.ReactNode }) {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar collapsible="icon" className="border-r">
        <SidebarContent>
          <ScrollArea className="h-full">
            <SidebarGroup>
              <SidebarGroupLabel>Меню</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[
                    { Icon: Home, label: "Главная", href: "/" },
                    { Icon: User, label: "Профиль", href: "/profile" },
                    { Icon: Settings, label: "Настройки", href: "/settings" },
                    { Icon: LogOut, label: "Выход", href: "/logout" },
                  ].map(({ Icon, label, href }) => (
                    <SidebarMenuItem key={href}>
                      <SidebarMenuButton asChild>
                        <a href={href} className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </ScrollArea>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <main className="flex-1 p-6 relative">
          <SidebarTrigger className="-ml-1" />

          {children}
        </main>
      </SidebarInset>

      {/* Основной контент */}
    </div>
  );
}
