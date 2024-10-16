import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/services/Client/UserService";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false)
  const { token, givenName, familyName, logout : zustandLogout} = useUserStore();
  const { theme } = useTheme()

  // scroll effect on the symbol
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

  const logout = async () => {
    const response = await UserService.logout();
    return response.data;
  }

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      console.log(data);
      zustandLogout();
      window.location.reload();
      setIsOpen(false)
    },
    onError: (error) => {
      console.error("Logout falhou:", error);
    }
  });

  const handleLogout = async () => {
    logoutMutation.mutate();
  };
  
  const logoSrc = theme === "special" 
  ? "/src/assets/CSC-SemFundo-Special.png"
  : "/src/assets/CSC-SemFundo.png"
  
  const NavItems = ({ inSheet = false }) => (
    <>
      <Link to="/" onClick={() => setIsOpen(false)} className={`text-primary text-lg dark:text-white font-bold ${inSheet ? 'w-full' : ''}`}>
        <Button variant="ghost" className={`flex items-center ${inSheet ? 'w-full justify-start' : ''}`}>
          <Home className="text-primary text-lg mr-1 dark:text-white" />
          Home
        </Button>
      </Link>
      <Link to="/socios" onClick={() => setIsOpen(false)} className={`text-primary text-lg dark:text-white font-bold ${inSheet ? 'w-full' : ''}`}>
        <Button variant="ghost" className={`flex items-center ${inSheet ? 'w-full justify-start' : ''}`}>
          <Users className="text-primary text-lg mr-1 dark:text-white" />
          Sócios
        </Button>
      </Link>
      <Link to="/matches" onClick={() => setIsOpen(false)} className={`text-primary text-lg dark:text-white font-bold ${inSheet ? 'w-full' : ''}`}>
        <Button variant="ghost" className={`flex items-center ${inSheet ? 'w-full justify-start' : ''}`}>
          <Calendar className="text-primary text-lg mr-1 dark:text-white" />
          Jogos
        </Button>
      </Link>
    </>
  )

  return (
    <nav className={`fixed w-full z-10 transition-all duration-300 ease-linear ${scrollFactor > 0 ? 'bg-gradient-to-b from-background via-background dark:via-neutral-800 to-transparent' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center transition-all duration-300 ease-linear h-28">
              <div className="hidden md:flex items-center">
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
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="flex-shrink-0 flex items-center transition-all duration-500">
                <img
                  src={logoSrc}
                  alt="Candelária Sport Clube Logo"
                  className={`transition-all duration-300 ease-linear ${scrollFactor ? 'h-12 sm:h-16 md:h-20' : 'h-16 sm:h-20 md:h-24'}`} 
                />
              </div>
              <div className="flex items-center">
                { token ? (
                  <div className="flex items-center">
                    <Avatar className="mr-2">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-primary mr-2 text-lg dark:text-white font-bold">
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
      )
    }
