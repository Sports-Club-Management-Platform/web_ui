import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Ticket } from "lucide-react"
import { format, parseISO, isBefore } from "date-fns"
import { pt } from "date-fns/locale"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { Link } from "react-router-dom"
import { GameResponse, ClubResponse } from "@/lib/types"
import {TicketResponse} from "../../../lib/types.ts";

interface GameCardProps {
  jogo: GameResponse
  ticket: TicketResponse | undefined
  clubs: ClubResponse[]
  index: number
  dataAtual: Date
}

export default function GameCard({ jogo, ticket, clubs, index, dataAtual }: GameCardProps) {
  const getBilheteStatus = (jogo: GameResponse) => {
    const jogoData = parseISO(jogo.date_time)
    if (isBefore(jogoData, dataAtual)) {
      return { color: "bg-gray-500", text: "Jogo Encerrado", animation: "none" }
    } else if (ticket){
      // If it exists ticket for game
      // might not sell tickets for all games
      return { color: "bg-green-500", text: "Disponível", animation: "pulse" }
    } else {
      return { color: "bg-red-500", text: "Indisponível para Venda", animation: "none" }
    }
    // You might want to add logic here to determine ticket availability

  }

  const { theme } = useTheme()

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const bilheteStatus = getBilheteStatus(jogo)
  const isJogoPassado = isBefore(parseISO(jogo.date_time), dataAtual)

  const clubeCasa = clubs.find(club => club.id === jogo.club_home_id)
  const clubeVisitante = clubs.find(club => club.id === jogo.club_visitor_id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 ${isJogoPassado && (theme === "dark" || theme === "special" ) && 'bg-background/30'} ${isJogoPassado && theme === "light" && "bg-gray-100"} `}>
        <CardHeader className="bg-secondary/10">
          <CardTitle className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <Clock className="mr-2" />
                {format(parseISO(jogo.date_time), "d MMMM 'de' yyyy", { locale: pt })}
              </div>
              <div className="flex pt-1 text-muted-foreground text-[1.2rem] items-center">
                {format(parseISO(jogo.date_time), "HH:mm")}
              </div>
            </div>
            <motion.div
              className={`px-2 py-1 rounded-full text-white text-xs text-center font-semibold ${bilheteStatus.color}`}
              animate={bilheteStatus.animation === "pulse" ? pulseAnimation : {}}
            >
              {bilheteStatus.text}
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <img src={clubeCasa?.image} alt={clubeCasa?.name} className="w-12 h-12 rounded-full object-cover" />
              <span className="font-semibold">{clubeCasa?.name}</span>
            </div>
            <span className="text-2xl font-bold">VS</span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{clubeVisitante?.name}</span>
              <img src={clubeVisitante?.image} alt={clubeVisitante?.name} className="w-12 h-12 rounded-full object-cover" />
            </div>
          </div>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{clubeCasa?.name}</span>
            </div>
            {!isJogoPassado && ticket && (
              <Link to={`/ticket-purchase/${jogo.id}`}>
                <Button variant="outline" size="sm" className="ml-2">
                  <Ticket className="h-4 w-4 mr-2" />
                  Comprar Bilhetes
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}