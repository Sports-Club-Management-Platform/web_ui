"use client"

import * as React from "react"
import { Bell, Calendar, CreditCard, Home, LifeBuoy, Send, Settings, Ticket, Users } from 'lucide-react'

import { NavMain } from "./components/nav-main"
import { NavUser } from "./components/nav-user"
import { TeamSwitcher } from "./components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/services/Client/UserService";
import { useNavigate } from 'react-router-dom'
import { useUserStore } from "@/stores/useUserStore";

// This is sample data.
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

export function Navbar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { token, name, logout: zustandLogout, email } = useUserStore();
    const navigate = useNavigate();

    const logout = async () => {
      const response = await UserService.logout();
      return response.data;
    }

    const logoutMutation = useMutation({
      mutationFn: logout,
      onSuccess: (data) => {
        console.log(data);
        zustandLogout();
      },
      onError: (error) => {
        console.error("Logout falhou:", error);
      }
    });

    const handleLogout = () => {
      logoutMutation.mutate();
      navigate('/');
    }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain 
          navMain={data.navMain}
          navManagement={data.navManagement}
          navAccount={data.navAccount}
          navSecondary={data.navSecondary}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser 
          token={token} 
          name={name} 
          email={email} 
          onLogout={handleLogout}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}