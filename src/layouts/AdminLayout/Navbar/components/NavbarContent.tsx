import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SquareTerminal, LifeBuoy, Send, Home, Users, Ticket, Settings, CreditCard, Bell, Calendar } from 'lucide-react'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useUserStore } from '@/stores/useUserStore'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const data = {
  navMain: [
    { title: "Home", url: "/", icon: Home },
    { title: "Jogos", url: "/matches", icon: Calendar },
    { title: "Sócios", url: "/members", icon: Users },
  ],
  navManagement: [
    { title: "Sócios", url: "/management/members", icon: Users },
    { title: "Bilhetes", url: "/management/tickets", icon: Ticket },
  ],
  navAccount: [
    { title: "Settings", url: "/account/settings", icon: Settings },
    { title: "Billing", url: "/account/billing", icon: CreditCard },
    { title: "Notifications", url: "/account/notifications", icon: Bell },
  ],
  navSecondary: [
    { title: "Support", url: "#", icon: LifeBuoy },
    { title: "Feedback", url: "#", icon: Send },
  ],
}

interface NavbarContentProps {
  isExpanded: boolean;
}

const NavbarContent: React.FC<NavbarContentProps> = ({ isExpanded }) => {
  const location = useLocation()
  const { token } = useUserStore()

  const NavItem = ({ item, isActive }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarMenuItem className="px-2">
            <SidebarMenuButton 
              asChild 
              isActive={isActive}
              className={`py-2 w-full text-sm ${isActive && isExpanded ? 'bg-primary/10 text-primary' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              <Link to={item.url} className="flex items-center transition-colors duration-300">
                <item.icon size={36} className={`transition-all duration-300 flex-shrink-0 ${
                  isActive ? 'text-primary' : ''
                } ${
                  isExpanded ? 'mr-2' : 'mx-2'
                }`} />
                <span className={`transition-all duration-300 ${
                  !isExpanded ? 'w-0' : 'w-auto'
                }`}>
                  {item.title}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </TooltipTrigger>
        {!isExpanded && <TooltipContent side="right">{item.title}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  )

  const NavGroup = ({ title, items }) => (
    <SidebarGroup className="mb-4 flex-shrink-0">
      {isExpanded ? (
        <SidebarGroupLabel className="px-4 mb-2 text-lg font-handwritten transition-opacity duration-300">
          {title}
        </SidebarGroupLabel>
      ) : (
        <div className="pr-2 mb-2 text-xs font-semibold text-muted-foreground overflow-hidden whitespace-nowrap">
          {title}
        </div>
      )}
      <SidebarMenu>
        {items.map((item) => (
          <NavItem key={item.title} item={item} isActive={location.pathname === item.url} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )

  return (
    <SidebarContent className="py-4 bg-background/20 flex flex-col h-full text-base">
      <NavGroup title="Platform" items={data.navMain.filter(item => !!token || item.title !== "Tasks")} />
      {token && <NavGroup title="Management" items={data.navManagement} />}
      {token && <NavGroup title="Account" items={data.navAccount} />}
      <SidebarGroup className="mt-auto flex-shrink-0">
        <SidebarMenu>
          {data.navSecondary.map((item) => (
            <NavItem key={item.title} item={item} isActive={false} />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  )
}

export default NavbarContent