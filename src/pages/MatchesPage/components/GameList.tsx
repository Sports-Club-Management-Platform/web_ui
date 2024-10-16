import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarIcon, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO, isWithinInterval, format } from "date-fns"
import { Button } from "@/components/ui/button"
import GameCard from './GameCard'
import NextGame from './NextGame'

const GameList = ({ jogos, proximoJogo, getBilheteStatus, dataAtual }) => {
  const [filtro, setFiltro] = useState("futuros")
  const [pesquisa, setPesquisa] = useState("")
  const [dataFiltro, setDataFiltro] = useState(null)

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

  const jogosFiltrados = jogos
    .filter(filtrarPorTrimestre)
    .filter(filtrarPorPesquisa)
    .filter(filtrarPorData)

  return (
    <div className="container pt-36 mx-auto p-4 space-y-6">
      {proximoJogo && <NextGame proximoJogo={proximoJogo} />}

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
        {jogosFiltrados.map((jogo, index) => (
          <GameCard
            key={jogo.id}
            jogo={jogo}
            index={index}
            dataAtual={dataAtual}
            getBilheteStatus={getBilheteStatus}
          />
        ))}
      </div>
      {jogosFiltrados.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">Nenhum jogo encontrado para os filtros selecionados.</p>
      )}
    </div>
  )
}

export default GameList
