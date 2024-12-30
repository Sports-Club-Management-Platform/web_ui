import React, { useState } from 'react'
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import NavbarHeader from './components/NavbarHeader'
import NavbarContent from './components/NavbarContent'
import NavbarFooter from './components/NavbarFooter'
import { useUserStore } from "@/stores/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/services/Client/UserService";
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar: React.FC = () => {
  const { token, name, logout: zustandLogout, email } = useUserStore();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <motion.div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => !isDropdownOpen && setIsExpanded(false)}
      animate={{ width: isExpanded ? "240px" : "100px" }}
      transition={{ duration: 0.3 }}
    >
      <Sidebar variant="inset" collapsible={isExpanded ? "none" : "icon"}>
        <SidebarContent>
          <NavbarHeader isExpanded={isExpanded} />
          <NavbarContent isExpanded={isExpanded} />
          <NavbarFooter 
            token={token} 
            name={name} 
            email={email} 
            onLogout={handleLogout}
            isExpanded={isExpanded}
            onDropdownOpenChange={setIsDropdownOpen}
            isDropdownOpen={isDropdownOpen}
          />
        </SidebarContent>
      </Sidebar>
    </motion.div>
  )
}

export default Navbar