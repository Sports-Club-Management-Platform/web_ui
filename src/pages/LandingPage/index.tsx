import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '@/stores/useUserStore'
import { UserService } from "../../services/Client/UserService";
import { useEffect } from "react";

export default function LandingPage() {

    const { token, setUserInformation } = useUserStore();

    const fetchUser = async () => {
        const response = await UserService.getUser();
        return response.data;
    }

    const { data } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        enabled: !!token,
    })

    useEffect(() => {
        console.log("Data do usuário:", data);
        if (data && token){
            setUserInformation(data);
        }
    }, [data, setUserInformation, token]);

    return (
        <div>
            <div className="relative flex flex-col min-h-screen">
                {/* Background image */}
                <div
                    className="absolute bg-cover bg-center filter blur-sm h-full w-full"
                    style={{ backgroundImage: "url('/src/assets/bg-landing_page.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-20"></div>
                {/* Content */}
                <div className="relative flex-grow bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                        Bem-vindo à plataforma do Candelária Sport Clube!
                    </h1>
                    <div className="space-x-4">
                        <Button size="lg">Tornar-se Sócio</Button>
                        <Button size="lg">Comprar Bilhetes</Button>
                    </div>
                </div>
            </div>
            <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio facere ab ipsum placeat magnam reiciendis eius necessitatibus, molestiae perferendis doloremque tempora expedita, repellendus quae pariatur. Ipsa maiores unde a quos.
            </div>
            <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio facere ab ipsum placeat magnam reiciendis eius necessitatibus, molestiae perferendis doloremque tempora expedita, repellendus quae pariatur. Ipsa maiores unde a quos.
            </div>
            <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio facere ab ipsum placeat magnam reiciendis eius necessitatibus, molestiae perferendis doloremque tempora expedita, repellendus quae pariatur. Ipsa maiores unde a quos.
            </div>
            <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio facere ab ipsum placeat magnam reiciendis eius necessitatibus, molestiae perferendis doloremque tempora expedita, repellendus quae pariatur. Ipsa maiores unde a quos.
            </div>
            <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio facere ab ipsum placeat magnam reiciendis eius necessitatibus, molestiae perferendis doloremque tempora expedita, repellendus quae pariatur. Ipsa maiores unde a quos.
            </div>
            <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio facere ab ipsum placeat magnam reiciendis eius necessitatibus, molestiae perferendis doloremque tempora expedita, repellendus quae pariatur. Ipsa maiores unde a quos.
            </div>
        </div>
    );
}
