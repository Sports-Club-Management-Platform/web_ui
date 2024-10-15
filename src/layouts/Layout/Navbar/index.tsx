import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";
import { useUserStore } from '@/stores/useUserStore'
import { useNavigate } from "react-router-dom";
import { Home, Users, Calendar } from 'lucide-react';
import { useTheme } from "@/components/theme-provider"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

export default function Navbar() {
    const [scrollY, setScrollY] = useState(0);
    const navigate = useNavigate();
    const { token, givenName, familyName, logout } = useUserStore();
    const { theme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const maxScroll = 100;
    const scrollFactor = Math.min(scrollY / maxScroll, 1);

    const handleLogout = () => {
        logout(navigate);
    }

    const logoSrc = theme === "special" 
        ? "/src/assets/CSC-SemFundo-Special.png"
        : "/src/assets/CSC-SemFundo.png";

    return (
        <nav className={`fixed w-full z-10 transition-all duration-300 ease-linear ${scrollFactor > 0 ? 'bg-gradient-to-b from-background via-background dark:via-neutral-800 to-transparent' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center transition-all duration-300 ease-linear h-28">
                    <div className="flex items-center">
                        <Link to="/">
                            <Button variant="ghost" className="text-primary text-lg dark:text-white font-bold bg-transparent">
                                <Home className="text-primary text-lg mr-1 dark:text-white" />
                                Home
                            </Button>
                        </Link>
                        <Button variant="ghost" className="text-primary text-lg dark:text-white font-bold bg-transparent">
                            <Users className="text-primary text-lg mr-1 dark:text-white" />
                            Sócios
                        </Button>
                        <Link to="/matches">
                            <Button variant="ghost" className="text-primary text-lg dark:text-white font-bold bg-transparent">
                                <Calendar className="text-primary text-lg mr-1 dark:text-white" />
                                Jogos
                            </Button>
                        </Link>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex-shrink-0 flex items-center transition-all duration-500">
                        <img
                            src={logoSrc}
                            alt="Candelária Sport Clube Logo"
                            className={`transition-all duration-300 ease-linear ${scrollFactor ? 'h-20' : 'h-24'}`} 
                        />
                    </div>
                    <div className="flex items-center">
                        { token ? (
                            <div className="flex items-center">
                                <Avatar className="mr-2">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="text-primary mr-2 text-lg dark:text-white font-bold">
                                    {givenName} {familyName}
                                </div>
                                <Button onClick={handleLogout} variant="outline" className="mr-2">Logout</Button>
                            </div>
                        ) : (
                            <div>
                                <Link to={import.meta.env.VITE_LOGIN_SIGN_UP}>
                                    <Button variant="outline" className="mr-2">Login</Button>
                                </Link>
                                <Link to={import.meta.env.VITE_LOGIN_SIGN_UP}>
                                    <Button className="mr-2">Register</Button>
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