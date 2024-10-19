import { format, parseISO } from "date-fns"
import { pt } from "date-fns/locale"
import { MapPin, Calendar, Clock } from "lucide-react"

interface GameHeaderProps {
  game: {
    data: string
    hora: string
    equipeA: string
    equipeB: string
    local: string
    imagemA: string
    imagemB: string
  }
}

export default function GameHeader({ game }: GameHeaderProps) {
  return (
    <>
      <div className="flex justify-center items-center space-x-8 mb-8">
        <div className="text-center">
          <img src={game.imagemA} alt={game.equipeA} className="w-32 h-32 mx-auto rounded-full border-4 border-white" />
          <h2 className="mt-2 text-2xl font-semibold">{game.equipeA}</h2>
        </div>
        <div className="text-6xl font-bold">VS</div>
        <div className="text-center">
          <img src={game.imagemB} alt={game.equipeB} className="w-32 h-32 mx-auto rounded-full border-4 border-white" />
          <h2 className="mt-2 text-2xl font-semibold">{game.equipeB}</h2>
        </div>
      </div>
      <div className="flex justify-center space-x-8 text-lg mb-8">
        <div className="flex items-center">
          <Calendar className="mr-2" />
          {format(parseISO(game.data), "d 'de' MMMM 'de' yyyy", { locale: pt })}
        </div>
        <div className="flex items-center">
          <Clock className="mr-2" />
          {game.hora}
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2" />
          {game.local}
        </div>
      </div>
    </>
  )
}