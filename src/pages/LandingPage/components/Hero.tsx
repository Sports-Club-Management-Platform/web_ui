import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <div
        className="absolute bg-cover bg-center filter blur-sm h-full w-full"
        style={{ backgroundImage: "url('/src/assets/bg-landing_page.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative flex-grow bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Bem-vindo à plataforma do Candelária Sport Clube!
        </h1>
        <div className="space-x-4">
          <Button size="lg">Tornar-se Sócio</Button>
          <Link to="/matches">
            <Button size="lg">Comprar Bilhetes</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}