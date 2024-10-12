import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";

export default function Navbar() {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed w-full z-10 transition-colors duration-300 ${isScrolled ? "bg-background shadow-xl" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Button variant="ghost" className={`text-primary font-bold ${isScrolled ? "hover:bg-green-50" : "bg-transparent"}`}>Sócios</Button>
                        <Button variant="ghost" className={`text-primary font-bold ${isScrolled ? "hover:bg-green-50" : "bg-transparent"}`}>Bilhetes</Button>
                    </div>
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            src="/src/assets/CSC-SemFundo.png"
                            alt="Candelária Sport Clube Logo"
                            className="h-20 w-auto absolute top-4" // Ajusta a altura e a posição do logo
                        />
                    </div>
                    <div className="flex items-center">
                        <Button variant="outline" className="mr-2">Login</Button>
                        <Button className="mr-2">Register</Button>
                        <ModeToggle/>
                    </div>
                </div>
            </div>
        </nav>
    )
}