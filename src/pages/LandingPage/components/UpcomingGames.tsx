import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"
import { format, parseISO } from "date-fns"
import { pt } from "date-fns/locale"

export default function UpcomingGames({ games, highlightedGame, onGameClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-6xl mt-8 mb-16">
      {games.map((game) => (
        <Card 
          key={game.id} 
          className={`cursor-pointer transition-all duration-300 ${highlightedGame && highlightedGame.id === game.id ? 'ring-2 ring-primary' : ''}`}
          onClick={() => onGameClick(game)}
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex justify-between items-center">
              <span>{game.equipeA}</span>
              <span>vs</span>
              <span>{game.equipeB}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <img src={game.imagemA} alt={game.equipeA} className="w-12 h-12 rounded-full" />
              <img src={game.imagemB} alt={game.equipeB} className="w-12 h-12 rounded-full" />
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {format(parseISO(game.data), "d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: pt })}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {game.local}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}