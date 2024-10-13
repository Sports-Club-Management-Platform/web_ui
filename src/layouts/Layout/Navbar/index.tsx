import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrollY, setScrollY] = useState(0);

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
    const scrollFactor = Math.min(scrollY / maxScroll, 1); // Normaliza o scroll entre 0 e 1

    return (
        <nav className={`fixed w-full z-10 transition-all duration-300 ease-linear ${scrollFactor > 0 ? 'shadow-xl bg-background' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center transition-all duration-300 ease-linear h-28">
                    <div className="flex items-center">
                        <Button variant="ghost" className={`text-primary text-lg dark:text-white font-bold bg-transparent`}>
                            Sócios
                        </Button>
                        <Button variant="ghost" className={`text-primary text-lg dark:text-white font-bold bg-transparent`}>
                            Bilhetes
                        </Button>
                    </div>
                    <div className="flex-shrink-0 flex items-center transition-all duration-500">
                        <img
                            src="/src/assets/CSC-SemFundo.png"
                            alt="Candelária Sport Clube Logo"
                            className={`transition-all duration-300 ease-linear ${scrollFactor? 'h-20 top-4' : 'h-24 top-8'} absolute`} 
                        />
                    </div>
                    <div className="flex items-center">
                        <Link to={import.meta.env.VITE_LOGIN_SIGN_UP}>
                            <Button variant="outline" className="mr-2">Login</Button>
                        </Link>
                        <Link to={import.meta.env.VITE_LOGIN_SIGN_UP}>
                            <Button className="mr-2">Register</Button>
                        </Link>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
