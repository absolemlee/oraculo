"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Oracle User",
    email: "oracle@oraculo.app",
    avatar: "/avatars/oracle.jpg",
  },
  navMain: [
    {
      title: "Oracle Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Traditional I-Ching",
      url: "/?tab=traditional",
      icon: SquareTerminal,
    },
    {
      title: "Ifá Correspondence",
      url: "/?tab=ifa",
      icon: Bot,
    },
    {
      title: "Hexagram Lookup",
      url: "/?tab=lookup",
      icon: BookOpen,
    },
    {
      title: "Reading History",
      url: "/dashboard/history",
      icon: PieChart,
    },
  ],
  navSecondary: [
    {
      title: "Oracle Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
    {
      title: "Documentation",
      url: "/dashboard/docs",
      icon: Map,
    },
    {
      title: "API Reference",
      url: "/dashboard/api",
      icon: Frame,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 text-sidebar-primary-foreground">
                  <Bot className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Oráculo
                  </span>
                  <span className="truncate text-xs">Oracle Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
