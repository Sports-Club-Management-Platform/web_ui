import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Ticket } from "lucide-react"
import { format, parseISO, isBefore } from "date-fns"
import { pt } from "date-fns/locale"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

export default function GameCard({ jogo, index, dataAtual }) {
  const getBilheteStatus = (jogo) => {
    const jogoData = parseISO(jogo.data)
    if (isBefore(jogoData, dataAtual)) {
      return { color: "bg-gray-500", text: "Jogo Encerrado", animation: "none" }
    }
    switch (jogo.bilhetes) {
      case "disponivel":
        return { color: "bg-green-500", text: "Disponível", animation: "pulse" }
      case "limitado":
        return { color: "bg-yellow-500", text: "Limitado", animation: "shake" }
      case "esgotado":
        return { color: "bg-red-500", text: "Esgotado", animation: "none" }
      default:
        return { color: "bg-gray-500", text: "Indisponível", animation: "none" }
    }
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

  const shakeAnimation = {
    x: [0, -2, 2, -2, 2, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }

  const bilheteStatus = getBilheteStatus(jogo)
  const isJogoPassado = isBefore(parseISO(jogo.data), dataAtual)

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
                
                {format(parseISO(jogo.data), "d MMMM 'de' yyyy", { locale: pt })}
              </div>
              <div className="flex pt-1 text-muted-foreground text-[1.2rem] items-center">
                {jogo.hora}
              </div>
            </div>
            <motion.div
              className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${bilheteStatus.color}`}
              animate={bilheteStatus.animation === "pulse" ? pulseAnimation : bilheteStatus.animation === "shake" ? shakeAnimation : {}}
            >
              {bilheteStatus.text}
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <img src={jogo.imagemA} alt={jogo.equipeA} className="w-12 h-12 rounded-full object-cover" />
              <span className="font-semibold">{jogo.equipeA}</span>
            </div>
            <span className="text-2xl font-bold">VS</span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{jogo.equipeB}</span>
              <img src={jogo.imagemB} alt={jogo.equipeB} className="w-12 h-12 rounded-full object-cover" />
            </div>
          </div>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{jogo.local}</span>
            </div>
            {!isJogoPassado && jogo.bilhetes === "disponivel" && (
              <Button variant="outline" size="sm" className="ml-2">
                <Ticket className="h-4 w-4 mr-2" />
                Comprar Bilhetes
              </Button>
            )}
            {!isJogoPassado && jogo.bilhetes === "limitado" && (
              <Button variant="outline" size="sm" className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                <Ticket className="h-4 w-4 mr-2" />
                Últimos Bilhetes
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}