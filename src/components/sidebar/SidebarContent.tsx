// components/sidebar/SidebarContent.tsx
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Settings, User, LogOut } from "lucide-react";

export function SidebarContent() {
  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        <ScrollArea className="h-full">
          <SidebarGroup>
            <SidebarGroupLabel>Меню</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  { icon: <Home />, label: "Главная", href: "/" },
                  { icon: <User />, label: "Профиль", href: "/profile" },
                  { icon: <Settings />, label: "Настройки", href: "/settings" },
                  { icon: <LogOut />, label: "Выход", href: "/logout" },
                ].map(({ icon, label, href }, idx) => (
                  <SidebarMenuItem key={idx}>
                    <SidebarMenuButton asChild>
                      <a href={href}>
                        {icon}
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
  );
}
