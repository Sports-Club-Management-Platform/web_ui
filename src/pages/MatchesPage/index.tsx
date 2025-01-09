"use client"

import { useState, useMemo, useEffect } from "react"
import { parseISO, isSameDay } from "date-fns"
import { AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import NextGame from "./components/NextGame"
import FilterControls from "./components/FilterControls"
import GameCard from "./components/GameCard"
import { GameResponse, ClubResponse, TicketResponse, TicketWithStockResponse } from "@/lib/types"
import { GamesService } from "@/services/Client/GamesService"
import { ClubService } from "@/services/Client/ClubService"
import { TicketService } from "@/services/Client/TicketService"
import { PaymentsService } from "@/services/Client/PaymentsService"
import { useQuery, useQueries } from "@tanstack/react-query"
import { DotPattern } from "@/components/ui/dot-pattern"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

const ITEMS_PER_PAGE = 6; // Número de itens a carregar por página

export default function MatchesPage() {
  const [filtro, setFiltro] = useState("todos")
  const [pesquisa, setPesquisa] = useState("")
  const [dataFiltro, setDataFiltro] = useState<Date | null>(null)
  const { theme } = useTheme()
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()

  const dataAtual = new Date()

  const { data: jogos = [] } = useQuery<GameResponse[]>({
    queryKey: ["games"],
    queryFn: async () => {
      const response = await GamesService.getGames()
      return response.data
    },
  })

  const { data: clubs = [] } = useQuery<ClubResponse[]>({
    queryKey: ["clubs"],
    queryFn: async () => {
      const response = await ClubService.getClubs()
      return response.data
    },
  })

  const { data: tickets = [] } = useQuery<TicketResponse[]>({
    queryKey: ["tickets"],
    queryFn: async () => {
      const response = await TicketService.getTickets()
      return response.data
    },
  })

  const ticketQueries = useQueries({
    queries: tickets.map(ticket => ({
      queryKey: ["ticketStock", ticket.id],
      queryFn: () => PaymentsService.getTicketStock(ticket.id),
      select: (response: { data: { stock: number } }) => response.data,
    })),
  })

  const ticketsWithStock = useMemo(() => {
    return tickets.map((ticket, index) => ({
      ...ticket,
      stock: ticketQueries[index].data,
    }))
  }, [tickets, ticketQueries])

  const getTicketByGameId = (gameId: number): TicketWithStockResponse | undefined => { 
    return ticketsWithStock.find(ticket => ticket.game_id === gameId)
  }
  const getClubById = (id: number) => clubs.find(club => club.id === id)

  const proximoJogo = jogos
    .filter((jogo) => parseISO(jogo.date_time) > dataAtual)
    .sort((a, b) => parseISO(a.date_time).getTime() - parseISO(b.date_time).getTime())[0]

  const filtrarPorJornada = (jogo: GameResponse) => {
    if (dataFiltro || filtro === "todos" || filtro === "futuros") return true
    return jogo.jornada === parseInt(filtro)
  }

  const filtrarPorPesquisa = (jogo: GameResponse) => {
    const termoPesquisa = pesquisa.toLowerCase()
    const clubeCasa = getClubById(jogo.club_home_id)
    const clubeVisitante = getClubById(jogo.club_visitor_id)
    return (
      jogo.date_time.includes(termoPesquisa) ||
      clubeCasa?.name.toLowerCase().includes(termoPesquisa) ||
      clubeVisitante?.name.toLowerCase().includes(termoPesquisa)
    )
  }

  const filtrarPorData = (jogo: GameResponse) => {
    if (!dataFiltro) return true
    return isSameDay(parseISO(jogo.date_time), dataFiltro)
  }

  const filtrarJogosFuturos = (jogo: GameResponse) => {
    if (dataFiltro) return true
    return filtro === "futuros" ? parseISO(jogo.date_time) > dataAtual : true
  }

  const jogosFiltrados = jogos
    .filter(filtrarPorJornada)
    .filter(filtrarPorPesquisa)
    .filter(filtrarPorData)
    .filter(filtrarJogosFuturos)

  const jogosExibidos = jogosFiltrados.slice(0, page * ITEMS_PER_PAGE)

  useEffect(() => {
    if (inView && jogosExibidos.length < jogosFiltrados.length) {
      setPage(prevPage => prevPage + 1)
    }
  }, [inView, jogosExibidos.length, jogosFiltrados.length])

  const handleDateSelect = (date: Date | null) => {
    setDataFiltro(date)
    if (date) {
      setFiltro("todos")
    }
  }

  return (
    <div className="container pt-36 mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">1ª Divisão de Hoquei em Patins</h1>
        <p className="text-xl text-muted-foreground">Acompanhe todos os jogos e garanta seus ingressos!</p>
      </div>
      {proximoJogo && <NextGame jogo={proximoJogo} clubs={clubs} theme={theme} />}
      <FilterControls
        filtro={filtro}
        setFiltro={setFiltro}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        dataFiltro={dataFiltro}
        setDataFiltro={handleDateSelect}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {jogosExibidos.map((jogo, index) => (
            <GameCard 
              key={jogo.id} 
              jogo={jogo} 
              ticket={getTicketByGameId(jogo.id)} 
              clubs={clubs} 
              index={index} 
              dataAtual={dataAtual} 
            />
          ))}
        </AnimatePresence>
      </div>
      {jogosExibidos.length < jogosFiltrados.length && (
        <div ref={ref} className="h-10" /> // Elemento observável para carregar mais itens
      )}
      {jogosFiltrados.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">Nenhum jogo encontrado para os filtros selecionados.</p>
      )}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(10000px_circle_at_center,rgba(255,255,255,0.1),transparent)]"
        )}
      />
    </div>
  )
}