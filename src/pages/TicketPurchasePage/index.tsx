"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import GameHeader from "./components/GameHeader"
import TicketSelection from "./components/TicketSelection"
import BuyerInformation from "./components/BuyerInformation"

// Mock data for the game (in a real app, you'd fetch this based on the gameId)
const game = {
  id: 1,
  data: "2023-12-15",
  hora: "20:00",
  equipeA: "Candelária SC",
  equipeB: "Sporting CP",
  local: "Pavilhão da Luz",
  imagemA: "https://picsum.photos/seed/CandelariaSC/200",
  imagemB: "https://picsum.photos/seed/SportingCP/200",
  estadioImagem: "https://picsum.photos/seed/EstadioLuz/1920/1080",
  preco: 15,
  disponivel: 100
}

export default function TicketPurchasePage() {
  const { gameId } = useParams()
  const [selectedTickets, setSelectedTickets] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("user@example.com")
  const [isChangingEmail, setIsChangingEmail] = useState(false)

  const handleTicketChange = (quantity: number) => {
    setSelectedTickets(quantity)
  }

  const handleContinueToPayment = () => {
    // might want to delete this if never used
  }

  return (
    <div className="min-h-screen pt-36 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${game.estadioImagem})` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-8 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center">Compra de Bilhetes</h1>
        <GameHeader game={game} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TicketSelection
            game={game}
            selectedTickets={selectedTickets}
            onTicketChange={handleTicketChange}
          />
          <BuyerInformation
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            isChangingEmail={isChangingEmail}
            setIsChangingEmail={setIsChangingEmail}
            onContinueToPayment={handleContinueToPayment}
          />
        </div>
      </div>
    </div>
  )
}