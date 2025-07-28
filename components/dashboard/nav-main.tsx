"use client"

import { usePathname, useRouter } from "next/navigation"
import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
  }[]
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (url: string) => {
    if (url.startsWith('/dashboard')) {
      router.push(url)
    } else {
      window.location.href = url
    }
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Oracle Functions</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton 
              tooltip={item.title}
              isActive={pathname === item.url}
              onClick={() => handleNavigation(item.url)}
            >
              <div className="flex items-center gap-2">
                {item.icon && <item.icon className="size-4" />}
                <span>{item.title}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
