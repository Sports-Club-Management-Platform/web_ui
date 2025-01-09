"use client"

import { useEffect, useState } from "react"
import { parseISO, isBefore } from "date-fns"
import Hero from './components/Hero'
import HighlightedGame from './components/HighlitedGame'
import ScrollDisappearingButtons from './components/ScrollDisappearingButtons'
import UpcomingGames from './components/UpcomingGames'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";


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
  const [highlightedGame, setHighlightedGame] = useState<{
    id: number;
    data: string;
    equipeA: string;
    equipeB: string;
    local: string;
    imagemA: string;
    imagemB: string;
  } | null>(null)


  useEffect(() => {
    if (mockGames.length > 0) {
      const sortedGames = [...mockGames].sort((a, b) => parseISO(a.data).getTime() - parseISO(b.data).getTime())
      const nextGame = sortedGames.find(game => isBefore(new Date(), parseISO(game.data)))
      setHighlightedGame(nextGame || sortedGames[0])
    }
  }, [])

  const handleGameClick = (game: { id: number; data: string; equipeA: string; equipeB: string; local: string; imagemA: string; imagemB: string }) => {
    setHighlightedGame(game)
  }

  const isNextGame = (game: { id: number; data: string; equipeA: string; equipeB: string; local: string; imagemA: string; imagemB: string }) => {
    return game.id === mockGames.find(g => isBefore(new Date(), parseISO(g.data)))?.id
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 left-0 w-full z-0">
        <Hero />
      </div>
      <ScrollDisappearingButtons />
      <div className="relative z-10 pt-[100vh]"> {/* Adjust pt value based on Hero height */}
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-background" containerClassName='mx-32'>
          <BackgroundBeamsWithCollision className="absolute inset-0">l</BackgroundBeamsWithCollision>
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {highlightedGame && (
              <HighlightedGame game={highlightedGame} isNextGame={isNextGame(highlightedGame)} />
            )}
            <UpcomingGames games={mockGames.slice(0, 3)} highlightedGame={highlightedGame} onGameClick={handleGameClick} />
          </div>
        </BackgroundGradient>
      </div>
    </div>
  )
}