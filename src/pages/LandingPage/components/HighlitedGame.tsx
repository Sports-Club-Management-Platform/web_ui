import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"
import { format, parseISO } from "date-fns"
import { pt } from "date-fns/locale"

export default function HighlightedGame({ game, isNextGame }) {
  return (
    <Card className="mx-auto max-w-6xl mt-8 bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {isNextGame ? "Próximo Jogo" : "Jogo em Destaque"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <img src={game.imagemA} alt={game.equipeA} className="w-24 h-24 mx-auto rounded-full" />
            <h3 className="mt-2 font-semibold">{game.equipeA}</h3>
          </div>
          <div className="text-4xl font-bold">VS</div>
          <div className="text-center">
            <img src={game.imagemB} alt={game.equipeB} className="w-24 h-24 mx-auto rounded-full" />
            <h3 className="mt-2 font-semibold">{game.equipeB}</h3>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center text-sm">
          <div className="flex items-center">
            <Clock className="mr-2" />
            {format(parseISO(game.data), "d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: pt })}
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2" />
            {game.local}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}