"use client"

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ModeToggle } from "@/components/mode-toggle"
import { useEffect, useState } from "react"
import { useUserStore } from "@/stores/useUserStore"
import { useMutation } from "@tanstack/react-query"
import { UserService } from "@/services/Client/UserService"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useTheme } from "@/components/theme-provider"
import { Ticket, Users, Calendar, Menu, Settings } from 'lucide-react'
import InteractiveHoverButton from "@/components/ui/interactive-hover-button"
import { UserMenu } from "./components/UserMenu"

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const { token, name, logout: zustandLogout } = useUserStore()
  const { theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const maxScroll = 100
  const scrollFactor = Math.min(scrollY / maxScroll, 1)

  const logout = async () => {
    const response = await UserService.logout()
    return response.data
  }

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      console.log(data)
      zustandLogout()
      window.location.reload()
      setIsOpen(false)
    },
    onError: (error) => {
      console.error("Logout falhou:", error)
    }
  })

  const handleLogout = async () => {
    logoutMutation.mutate()
  }
  
  const logoSrc = theme === "special" 
    ? "/src/assets/CSC-SemFundo-Special.png"
    : "/src/assets/CSC-SemFundo.png"
  
  const NavItems = ({ inSheet = false }) => (
    <div className="flex items-center space-x-4">
      <Link to="/matches">
        <InteractiveHoverButton className={`${inSheet ? 'w-full justify-start' : ''}`} text="Jogos" icon={Calendar} />
      </Link>
      <Link to="/tickets">
        <InteractiveHoverButton className={`${inSheet ? 'w-full justify-start' : ''}`} text="Bilhetes" icon={Ticket} />
      </Link>
      <Link to="/membership">
        <InteractiveHoverButton className={`${inSheet ? 'w-full justify-start' : ''}`} text="Sócio" icon={Users} />
      </Link>
    </div>
  )
  
  return (
    <nav className={`fixed w-full z-30 transition-all duration-300 ease-linear ${
      scrollFactor > 0 ? 'bg-background/80 backdrop-blur-lg shadow-sm' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 flex items-center justify-start">
            <div className="hidden md:flex items-center gap-4">
              <NavItems />
            </div>
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4 mt-4">
                    <NavItems inSheet={true} />
                    {token && (
                      <Link to="/management" onClick={() => setIsOpen(false)} className="w-full">
                        <Button variant="ghost" className="w-full justify-start">
                          <Settings className="text-primary text-lg mr-1 dark:text-white" />
                          Management
                        </Button>
                      </Link>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
              <Link to={"/"} className="relative w-24 h-24">
                <img
                  src={logoSrc}
                  alt="Candelária Sport Clube Logo"
                  className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-linear ${
                    scrollFactor ? 'h-14 top-5' : 'h-20 top-5'
                  }`}
                  style={{ 
                    filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.1))',
                    objectFit: 'contain'
                  }}
                />
              </Link>
          </div>

          <div className="flex-1 flex items-center justify-end gap-2">
            {token ? (
             <UserMenu name={name} handleLogout={handleLogout} />
            ) : (
              <div className="flex items-center gap-2">
                <Link to={import.meta.env.VITE_LOGIN_SIGN_UP}>
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to={import.meta.env.VITE_LOGIN_SIGN_UP}>
                  <Button>Register</Button>
                </Link>
              </div>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
