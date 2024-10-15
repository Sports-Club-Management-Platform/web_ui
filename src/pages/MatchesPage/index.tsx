"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon, Search, Clock, MapPin, Ticket } from "lucide-react"
import { format, parseISO, isWithinInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isBefore } from "date-fns"
import { pt } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

// Dados de exemplo para os jogos (incluindo jogos futuros, URLs de imagens e disponibilidade de bilhetes)
const jogos = [
  { id: 1, data: "2023-01-15", hora: "15:00", equipeA: "Leões FC", equipeB: "Águias SC", local: "Estádio Central", imagemA: "https://picsum.photos/seed/LeoesFC/200", imagemB: "https://picsum.photos/seed/AguiasSC/200", bilhetes: "esgotado" },
  { id: 2, data: "2023-02-20", hora: "20:00", equipeA: "Tigres United", equipeB: "Panteras AC", local: "Arena Norte", imagemA: "https://picsum.photos/seed/TigresUnited/200", imagemB: "https://picsum.photos/seed/PanterasAC/200", bilhetes: "disponivel" },
  { id: 3, data: "2023-04-10", hora: "18:30", equipeA: "Dragões EC", equipeB: "Falcões FC", local: "Estádio do Dragão", imagemA: "https://picsum.photos/seed/DragoesEC/200", imagemB: "https://picsum.photos/seed/FalcoesFC/200", bilhetes: "limitado" },
  { id: 4, data: "2023-05-05", hora: "16:45", equipeA: "Lobos SC", equipeB: "Ursos FC", local: "Toca da Raposa", imagemA: "https://picsum.photos/seed/LobosSC/200", imagemB: "https://picsum.photos/seed/UrsosFC/200", bilhetes: "disponivel" },
  { id: 5, data: "2023-07-22", hora: "19:15", equipeA: "Tubarões AC", equipeB: "Golfinhos EC", local: "Arena Aquática", imagemA: "https://picsum.photos/seed/TubaroesAC/200", imagemB: "https://picsum.photos/seed/GolfinhosEC/200", bilhetes: "esgotado" },
  { id: 6, data: "2023-08-30", hora: "21:00", equipeA: "Corujas FC", equipeB: "Morcegos United", local: "Estádio Noturno", imagemA: "https://picsum.photos/seed/CorujasFC/200", imagemB: "https://picsum.photos/seed/MorcegosUnited/200", bilhetes: "limitado" },
  { id: 7, data: "2023-10-12", hora: "17:30", equipeA: "Raposas SC", equipeB: "Guepardos AC", local: "Campo Veloz", imagemA: "https://picsum.photos/seed/RaposasSC/200", imagemB: "https://picsum.photos/seed/GuepardosAC/200", bilhetes: "disponivel" },
  { id: 8, data: "2023-11-25", hora: "14:00", equipeA: "Elefantes FC", equipeB: "Rinocerontes EC", local: "Estádio Savana", imagemA: "https://picsum.photos/seed/ElefantesFC/200", imagemB: "https://picsum.photos/seed/RinocerontesEC/200", bilhetes: "esgotado" },
  { id: 9, data: "2023-12-05", hora: "20:30", equipeA: "Leões FC", equipeB: "Tigres United", local: "Estádio Central", imagemA: "https://picsum.photos/seed/LeoesFC/200", imagemB: "https://picsum.photos/seed/TigresUnited/200", bilhetes: "disponivel" },
  { id: 10, data: "2024-01-18", hora: "19:00", equipeA: "Águias SC", equipeB: "Panteras AC", local: "Ninho da Águia", imagemA: "https://picsum.photos/seed/AguiasSC/200", imagemB: "https://picsum.photos/seed/PanterasAC/200", bilhetes: "limitado" },
  { id: 11, data: "2024-02-22", hora: "16:00", equipeA: "Dragões EC", equipeB: "Lobos SC", local: "Estádio do Dragão", imagemA: "https://picsum.photos/seed/DragoesEC/200", imagemB: "https://picsum.photos/seed/LobosSC/200", bilhetes: "disponivel" },
  { id: 12, data: "2024-11-10", hora: "18:45", equipeA: "Falcões FC", equipeB: "Ursos FC", local: "Arena das Aves", imagemA: "https://picsum.photos/seed/FalcoesFC/200", imagemB: "https://picsum.photos/seed/UrsosFC/200", bilhetes: "disponivel" },
  { id: 13, data: "2024-12-15", hora: "21:30", equipeA: "Tubarões AC", equipeB: "Golfinhos EC", local: "Arena Aquática", imagemA: "https://picsum.photos/seed/TubaroesAC/200", imagemB: "https://picsum.photos/seed/GolfinhosEC/200", bilhetes: "esgotado" },
  { id: 14, data: "2025-01-20", hora: "20:15", equipeA: "Corujas FC", equipeB: "Morcegos United", local: "Estádio Noturno", imagemA: "https://picsum.photos/seed/CorujasFC/200", imagemB: "https://picsum.photos/seed/MorcegosUnited/200", bilhetes: "limitado" },
  { id: 15, data: "2025-02-25", hora: "17:00", equipeA: "Raposas SC", equipeB: "Guepardos AC", local: "Campo Veloz", imagemA: "https://picsum.photos/seed/RaposasSC/200", imagemB: "https://picsum.photos/seed/GuepardosAC/200", bilhetes: "disponivel" },
  { id: 16, data: "2025-03-30", hora: "15:30", equipeA: "Elefantes FC", equipeB: "Rinocerontes EC", local: "Estádio Savana", imagemA: "https://picsum.photos/seed/ElefantesFC/200", imagemB: "https://picsum.photos/seed/RinocerontesEC/200", bilhetes: "esgotado" }
]

export default function Component() {
  const [filtro, setFiltro] = useState("futuros")
  const [pesquisa, setPesquisa] = useState("")
  const [dataFiltro, setDataFiltro] = useState(null)

  const dataAtual = new Date()

  const proximoJogo = jogos
    .filter(jogo => parseISO(jogo.data) > dataAtual)
    .sort((a, b) => parseISO(a.data).getTime() - parseISO(b.data).getTime())[0]

  const filtrarPorTrimestre = (jogo) => {
    const mes = parseInt(jogo.data.split("-")[1])
    if (filtro === "todos" || filtro === "futuros") return true
    if (filtro === "1") return mes >= 1 && mes <= 3
    if (filtro === "2") return mes >= 4 && mes <= 6
    if (filtro === "3") return mes >= 7 && mes <= 9
    if (filtro === "4") return mes >= 10 && mes <= 12
  }

  const filtrarPorPesquisa = (jogo) => {
    const termoPesquisa = pesquisa.toLowerCase()
    return (
      jogo.data.includes(termoPesquisa) ||
      jogo.equipeA.toLowerCase().includes(termoPesquisa) ||
      jogo.equipeB.toLowerCase().includes(termoPesquisa)
    )
  }

  const filtrarPorData = (jogo) => {
    if (!dataFiltro) return true
    const jogoData = parseISO(jogo.data)
    if (filtro === "semana") {
      const inicio = startOfWeek(dataFiltro)
      const fim = endOfWeek(dataFiltro)
      return isWithinInterval(jogoData, { start: inicio, end: fim })
    } else if (filtro === "mes") {
      const inicio = startOfMonth(dataFiltro)
      const fim = endOfMonth(dataFiltro)
      return isWithinInterval(jogoData, { start: inicio, end: fim })
    }
    return true
  }

  const filtrarJogosFuturos = (jogo) => {
    return filtro === "futuros" ? parseISO(jogo.data) > dataAtual : true
  }

  const jogosFiltrados = jogos
    .filter(filtrarPorTrimestre)
    .filter(filtrarPorPesquisa)
    .filter(filtrarPorData)
    .filter(filtrarJogosFuturos)

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

  return (
    <div className="container pt-36 mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">1ª Divisão de Hoquei em Patins</h1>
        <p className="text-xl text-muted-foreground">Acompanhe todos os jogos e garanta seus ingressos!</p>
      </div>

      {proximoJogo && (
        <Card className="bg-gradient-to-r from-[hsl(126,95%,28%)] to-[hsl(126,95%,20%)] text-white overflow-hidden dark:from-[hsl(126,95%,20%)] dark:to-[hsl(126,95%,12%)]">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-1">Próximo Jogo</CardTitle>
            <CardDescription className="text-green-100 text-lg">
              Não perca essa emocionante partida!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <img src={proximoJogo.imagemA} alt={proximoJogo.equipeA} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
                <h3 className="mt-2 text-xl font-semibold">{proximoJogo.equipeA}</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold my-2">VS</div>
                <div className="bg-white text-green-800 rounded-full px-4 py-2 font-bold text-sm">
                  {format(parseISO(proximoJogo.data), "dd/MM/yyyy")}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <img src={proximoJogo.imagemB} alt={proximoJogo.equipeB} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
                <h3 className="mt-2 text-xl font-semibold">{proximoJogo.equipeB}</h3>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center text-sm bg-green-800/30 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span className="font-medium">{proximoJogo.hora}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">{proximoJogo.local}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex  flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dataFiltro ? format(dataFiltro, "PPP") : <span>Selecionar data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dataFiltro}
                onSelect={(date) => {
                  setDataFiltro(date)
                  setFiltro(date ? "semana" : "todos")
                }}
                initialFocus
              />
              {dataFiltro && (
                <div className="flex justify-center space-x-2 p-2 border-t">
                  <Button
                    variant={filtro === "semana" ? "default" : "outline"}
                    onClick={() => setFiltro("semana")}
                    size="sm"
                  >
                    Semana
                  </Button>
                  <Button
                    variant={filtro === "mes" ? "default" : "outline"}
                    onClick={() => setFiltro("mes")}
                    size="sm"
                  >
                    Mês
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex space-x-2 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar por data ou equipe"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filtro} onValueChange={setFiltro}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="futuros">Jogos Futuros</SelectItem>
              <SelectItem value="todos">Todos os jogos</SelectItem>
              <SelectItem value="1">1º Trimestre</SelectItem>
              <SelectItem value="2">2º Trimestre</SelectItem>
              <SelectItem value="3">3º Trimestre</SelectItem>
              <SelectItem value="4">4º Trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {jogosFiltrados.map((jogo, index) => {
            const bilheteStatus = getBilheteStatus(jogo)
            const isJogoPassado = isBefore(parseISO(jogo.data), dataAtual)
            return (
              <motion.div
                key={jogo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 ${isJogoPassado ? 'bg-gray-100' : ''}`}>
                  <CardHeader className="bg-secondary/10">
                    <CardTitle className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                              <Clock className="mr-2" />
                              {format(parseISO(jogo.data), "d MMMM 'de' yyyy", { locale: pt })}
                        </div>
                        {/* hora mais pequena em baixo do dia */}
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
          })}
        </AnimatePresence>
      </div>
      {jogosFiltrados.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">Nenhum jogo encontrado para os filtros selecionados.</p>
      )}
    </div>
  )
}