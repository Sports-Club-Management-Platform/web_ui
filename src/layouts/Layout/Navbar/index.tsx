import { Button } from "@/components/ui/button";
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Button variant="ghost" className="text-green-700 hover:bg-green-50 mr-2">Sócios</Button>
                        <Button variant="ghost" className="text-green-700 hover:bg-green-50">Bilhetes</Button>
                    </div>
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            src="/src/assets/logo-csc.jpg"
                            alt="Candelária Sport Clube Logo"
                            className="h-12 w-auto"
                        />
                    </div>
                    <div className="flex items-center">
                        <Link to={import.meta.env.VITE_LOGIN_SIGN_UP}>
                            <Button variant="outline" className="mr-2 text-green-700 border-green-700 hover:bg-green-50">Login</Button>
                        </Link>
                        <Link to={import.meta.env.VITE_LOGIN_SIGN_UP}>
                            <Button className="bg-green-700 text-white hover:bg-green-800">Register</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}