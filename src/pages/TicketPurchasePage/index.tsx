"use client"

import { useState } from "react"
import {useNavigate, useParams} from "react-router-dom"
import GameHeader from "./components/GameHeader"
import TicketSelection from "./components/TicketSelection"
import { GameResponse, PavilionResponse } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { GamesService } from "@/services/Client/GamesService"
import { PavilionsService } from "@/services/Client/PavilionsService"
import { Skeleton } from "@/components/ui/skeleton"
import {TicketService} from "@/services/Client/TicketService.tsx";
import {TicketResponse} from "../../lib/types.ts";

export default function TicketPurchasePage() {
  const { gameId } = useParams()
  const [selectedNumberTickets, setSelectedNumberTickets] = useState(1)
  const navigate = useNavigate();

  const { data: ticket, isLoading: isLoadingTicket, error: ticketError} = useQuery<TicketResponse>({
    queryKey: ["ticket"],
    queryFn: () => TicketService.getTicketByGameId(gameId).then(response=> response.data),
  })

  const { data: game, isLoading: isLoadingGame, error: gameError } = useQuery<GameResponse>({
    queryKey: ["game", gameId],
    queryFn: () => GamesService.getGame(gameId).then(response => response.data),
  })

  const { data: pavilion, isLoading: isLoadingPavilion } = useQuery<PavilionResponse>({
    queryKey: ["pavilion", game?.pavilion_id],
    queryFn: () => PavilionsService.getPavilion(game.pavilion_id).then(response => response.data),
    enabled: !!game?.pavilion_id,
  })

  const handleTicketChange = (quantity: number) => {
    setSelectedNumberTickets(quantity)
  }

  if (isLoadingGame || isLoadingPavilion || isLoadingTicket) {
    return (
      <div className="min-h-screen pt-36 container mx-auto px-4 py-8">
        <Skeleton className="w-full h-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    )
  }

  if (gameError || !game) {
    if (gameError?.status === 404) {
      // game does not exist
      navigate("/404")
    }
    return (
      <div className="min-h-screen pt-36 container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p>Unable to load game information. Please try again later.</p>
      </div>
    )
  }

  if (ticketError || !ticket) {
    if (ticketError?.status === 404) {
      // game does not exist
      navigate("/404")
    }
    return (
      <div className="min-h-screen pt-36 container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p>Unable to load ticket information. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-36 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${pavilion?.image || '/placeholder.svg?height=1080&width=1920'})` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-8 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center">Compra de Bilhetes</h1>
        <GameHeader game={game} pavilion={pavilion} />
        <div className="grid grid-cols-1 gap-8">
          <TicketSelection
            selectedNumberTickets={selectedNumberTickets}
            ticketData={ticket}
            onTicketChange={handleTicketChange}
          />
        </div>
      </div>
    </div>
  )
}