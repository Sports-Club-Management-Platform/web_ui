import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"
import { format, parseISO } from "date-fns"
import { GameResponse, ClubResponse } from "@/lib/types"

interface NextGameProps {
  jogo: GameResponse
  clubs: ClubResponse[]
  theme: string
}

export default function NextGame({ jogo, clubs, theme }: NextGameProps) {
  const specialdregrade = theme === "special" ? "from-[hsl(40,64%,39%)] to-[hsl(40,64%,25%)]" : ""

  const clubeCasa = clubs.find(club => club.id === jogo.club_home_id)
  const clubeVisitante = clubs.find(club => club.id === jogo.club_visitor_id)

  return (
    <Card className={`bg-gradient-to-r from-[hsl(126,95%,28%)] to-[hsl(126,95%,20%)] text-white overflow-hidden dark:from-[hsl(126,95%,20%)] dark:to-[hsl(126,95%,12%)] ${specialdregrade}`}>
      <CardHeader>
        <CardTitle className="text-3xl font-bold mb-1">Próximo Jogo</CardTitle>
        <CardDescription className="text-green-100 text-lg">
          Não perca essa emocionante partida!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <img src={clubeCasa?.image} alt={clubeCasa?.name} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
            <h3 className="mt-2 text-xl font-semibold">{clubeCasa?.name}</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold my-2">VS</div>
            <div className={`bg-white rounded-full px-4 py-2 font-bold text-sm ${theme === "special" ? "text-[hsl(40,64%,39%)]" : "text-primary"}`}>
              {format(parseISO(jogo.date_time), "dd/MM/yyyy")}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img src={clubeVisitante?.image} alt={clubeVisitante?.name} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
            <h3 className="mt-2 text-xl font-semibold">{clubeVisitante?.name}</h3>
          </div>
        </div>
        <div className={`mt-4 flex justify-between items-center text-sm rounded-lg p-3 ${theme === "special" ? "bg-[hsl(40,64%,80%)]/30" : "bg-green-800/30"}`}>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span className="font-medium">{format(parseISO(jogo.date_time), "HH:mm")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span className="font-medium">{clubeCasa?.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}