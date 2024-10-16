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
import FilterControls from "./FilterControls"

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
        <FilterControls
            filtro={filtro}
            setFiltro={setFiltro}
            pesquisa={pesquisa}
            setPesquisa={setPesquisa}
            dataFiltro={dataFiltro}
            setDataFiltro={setDataFiltro}
        />
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
