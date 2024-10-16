import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../../services/Client/UserService";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);

  const { token, givenName, familyName, logout : zustandLogout} = useUserStore();

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
    window.location.reload();
    return response.data;
  }

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      console.log(data);
      zustandLogout();
      window.location.reload();
    },
    onError: (error) => {
      console.error("Logout falhou:", error);
    }
  });

  const handleLogout = async () => {
    logoutMutation.mutate();
  };

  return (
    <nav
      className={`fixed w-full z-10 transition-all duration-300 ease-linear ${
        scrollFactor > 0
          ? "bg-gradient-to-b from-background dark:via-neutral-800 to-transparent"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center transition-all duration-300 ease-linear h-28">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className={`text-primary text-lg dark:text-white font-bold bg-transparent`}
            >
              Sócios
            </Button>
            <Button
              variant="ghost"
              className={`text-primary text-lg dark:text-white font-bold bg-transparent`}
            >
              Bilhetes
            </Button>
            <Link to="/matches">
              <Button
                variant="ghost"
                className={`text-primary text-lg dark:text-white font-bold bg-transparent`}
              >
                Jogos
              </Button>
            </Link>
          </div>
          <div className="flex-shrink-0 flex items-center transition-all duration-500">
            <img
              src="/src/assets/CSC-SemFundo.png"
              alt="Candelária Sport Clube Logo"
              className={`transition-all duration-300 ease-linear ${
                scrollFactor ? "h-20 top-4" : "h-24 top-8"
              } absolute`}
            />
          </div>
          <div className="flex items-center">
            {token ? (
              <div className="flex items-center">
                <Avatar className="mr-2">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-primary mr-2 text-lg dark:text-white font-bold">
                  {givenName} {familyName}
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="mr-2"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Link to={import.meta.env.VITE_LOGIN_SIGN_UP}>
                  <Button variant="outline" className="mr-2">
                    Login
                  </Button>
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
