"use client"

import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '@/stores/useUserStore'
import { UserService } from "@/services/Client/UserService"
import { useEffect, useState } from "react"
import { parseISO, isBefore } from "date-fns"
import Hero from './components/Hero'
import HighlightedGame from './components/HighlitedGame'
import UpcomingGames from './components/UpcomingGames'

const mockGames = [
  {
    id: 1,
    data: "2024-12-15T20:00:00",
    equipeA: "Candelária SC",
    equipeB: "Sporting CP",
    local: "Pavilhão da Luz",
    imagemA: "https://picsum.photos/seed/CandelariaSC/200",
    imagemB: "https://picsum.photos/seed/SportingCP/200"
  },
  {
    id: 2,
    data: "2024-12-22T19:30:00",
    equipeA: "FC Porto",
    equipeB: "Candelária SC",
    local: "Dragão Arena",
    imagemA: "https://picsum.photos/seed/FCPorto/200",
    imagemB: "https://picsum.photos/seed/CandelariaSC/200"
  },
  {
    id: 3,
    data: "2024-03-29T21:00:00",
    equipeA: "Candelária SC",
    equipeB: "SL Benfica",
    local: "Pavilhão da Luz",
    imagemA: "https://picsum.photos/seed/CandelariaSC/200",
    imagemB: "https://picsum.photos/seed/SLBenfica/200"
  },
  {
    id: 4,
    data: "2024-04-05T18:00:00",
    equipeA: "Oliveirense",
    equipeB: "Candelária SC",
    local: "Pavilhão Dr. Salvador Machado",
    imagemA: "https://picsum.photos/seed/Oliveirense/200",
    imagemB: "https://picsum.photos/seed/CandelariaSC/200"
  }
]

export default function LandingPage() {
  const { token, setUserInformation } = useUserStore()
  const [highlightedGame, setHighlightedGame] = useState(null)

  console.log("Token acessado na LandingPage:", token)

  const fetchUser = async () => {
    const response = await UserService.getUser()
    return response.data
  }

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: !!token,
  })

  useEffect(() => {
    console.log("Data do usuário:", data)
    if (data && token) {
      setUserInformation(data)
    }
  }, [data, setUserInformation, token])

  useEffect(() => {
    if (mockGames.length > 0) {
      const sortedGames = [...mockGames].sort((a, b) => parseISO(a.data).getTime() - parseISO(b.data).getTime())
      const nextGame = sortedGames.find(game => isBefore(new Date(), parseISO(game.data)))
      setHighlightedGame(nextGame || sortedGames[0])
    }
  }, [])

  const handleGameClick = (game) => {
    setHighlightedGame(game)
  }

  const isNextGame = (game) => {
    return game.id === mockGames.find(g => isBefore(new Date(), parseISO(g.data)))?.id
  }

  return (
    <div>
      <Hero />
      {highlightedGame && (
        <HighlightedGame game={highlightedGame} isNextGame={isNextGame(highlightedGame)} />
      )}
      <UpcomingGames games={mockGames.slice(0, 3)} highlightedGame={highlightedGame} onGameClick={handleGameClick} />
    </div>
  )
}