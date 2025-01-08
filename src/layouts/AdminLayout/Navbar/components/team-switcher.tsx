"use client"

import CSCLogo from "@/assets/CSC-SemFundo.png";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0">
              <img src={CSCLogo} alt="CSC Logo" className="h-8 w-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="grid text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Adminstation
                </span>
                <span className="truncate text-xs">Candelária S. C.</span>
              </div>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}