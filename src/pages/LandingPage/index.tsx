import { Button } from "@/components/ui/button"

export default function LandingPage() {
    return (
        <div className="relative h-screen">
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sm"
                style={{ backgroundImage: "url('/src/assets/bg-landing_page.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                    Bem-vindo à plataforma do Candelária Sport Clube!
                </h1>
                <div className="space-x-4">
                    <Button size="lg" className="bg-green-700 text-white hover:bg-green-800">Tornar-se Sócio</Button>
                    <Button size="lg" className="bg-green-700 text-white hover:bg-green-800">Comprar Bilhetes</Button>
                </div>
            </div>
        </div>
    )
}