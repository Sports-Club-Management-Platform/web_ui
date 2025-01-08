"use client"

import { type LucideIcon } from 'lucide-react'
import { Link, useLocation } from "react-router-dom"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
}

interface NavMainProps {
  navMain: NavItem[]
  navManagement: NavItem[]
  navAccount: NavItem[]
  navSecondary: NavItem[]
}

export function NavMain({ navMain, navManagement, navAccount, navSecondary }: NavMainProps) {
  const location = useLocation()

  const renderNavGroup = (items: NavItem[], groupLabel: string) => (
    <SidebarGroup>
      <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === item.url}
              className={`py-2 w-full text-sm ${
                location.pathname === item.url
                  ? 'bg-primary/50 text-primary'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Link to={item.url} className="flex items-center transition-colors duration-300">
                {item.icon && <item.icon size={36} className="mr-2 flex-shrink-0" />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )

  return (
    <>
      {renderNavGroup(navMain, "Platform")}
      {renderNavGroup(navManagement, "Management")}
      {renderNavGroup(navAccount, "Account")}
      {renderNavGroup(navSecondary, "Help")}
    </>
  )
}