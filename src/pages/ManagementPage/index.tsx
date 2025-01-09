"use client"

import { useState, useMemo } from "react"
import { parseISO, isSameDay, isWithinInterval } from "date-fns"
import FilterControls from "./components/FilterControls"
import { GameResponse, ClubResponse, StockResponse } from "@/lib/types"
import { GamesService } from "@/services/Client/GamesService"
import { ClubService } from "@/services/Client/ClubService"
import { useQuery, useQueries } from "@tanstack/react-query"
import {columns, ComprehensiveTicketData} from "./components/columns.tsx";
import {DataTable} from "./components/data-table.tsx";
import {TicketResponse} from "../../lib/types.ts";
import {TicketService} from "../../services/Client/TicketService.tsx";
import { PaymentsService } from "@/services/Client/PaymentsService"
import { ColumnDef } from "@tanstack/react-table"

interface DateRange {
  from: Date;
  to?: Date;
}
export default function MatchesPage() {
  const [filtro, setFiltro] = useState("todos")
  const [pesquisa, setPesquisa] = useState("")
  const [dataFiltro, setDataFiltro] = useState<DateRange | null>(null);
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

  const stockQueries = useQueries({
    queries: tickets.map((ticket) => ({
      queryKey: ["stock", ticket.id],
      queryFn: () => PaymentsService.getTicketStock(ticket.id).then(response => response.data),
      enabled: !!ticket,
    })),
  })

  const getClubById = (id: number) => clubs.find(club => club.id === id)

  const comprehensiveData: ComprehensiveTicketData[] = useMemo(() => {
    return tickets.map((ticket: TicketResponse, index: number): ComprehensiveTicketData => {
      const game: GameResponse | undefined = jogos.find(game => game.id === ticket.game_id);
      const stock: StockResponse | undefined = stockQueries[index].data;
      const homeClub = game ? getClubById(game.club_home_id) : undefined;
      const visitorClub = game ? getClubById(game.club_visitor_id) : undefined;

      return {
        ticket: ticket,
        game: game,
        home_club: homeClub,
        visitor_club: visitorClub,
        stock: stock?.stock,
        fullGameData: game!,
        fullHomeClubData: homeClub!,
        fullVisitorClubData: visitorClub!,
        fullStockData: stock!,
      };
    });
  }, [tickets, jogos, clubs, stockQueries]);

  const filtrarPorJornada = (ticket: ComprehensiveTicketData) => {
    if (dataFiltro || filtro === "todos" || filtro === "futuros") return true
    return ticket.game?.jornada === parseInt(filtro)
  }

  const filtrarPorPesquisa = (ticket: ComprehensiveTicketData) => {
    const termoPesquisa = pesquisa.toLowerCase()
    const clubeCasa = ticket.home_club
    const clubeVisitante = ticket.visitor_club
    return (
      ticket.game?.date_time.includes(termoPesquisa) ||
      clubeCasa?.name.toLowerCase().includes(termoPesquisa) ||
      clubeVisitante?.name.toLowerCase().includes(termoPesquisa)
    )
  }

  const filtrarPorData = (ticket: ComprehensiveTicketData) => {
    if (!dataFiltro?.from) return true
    const gameDate = ticket.game ? parseISO(ticket.game.date_time) : null
    if (!gameDate) return false
    if (dataFiltro.to) {
      return isWithinInterval(gameDate, { start: dataFiltro.from, end: dataFiltro.to })
    }
    return isSameDay(gameDate, dataFiltro.from)
  }

  const filtrarJogosFuturos = (ticket: ComprehensiveTicketData) => {
    if (dataFiltro) return true
    return filtro === "futuros" ? ticket.game && parseISO(ticket.game.date_time) > dataAtual : true
  }

  const ticketsFiltrados: ComprehensiveTicketData[] = comprehensiveData
    .filter(filtrarPorJornada)
    .filter(filtrarPorPesquisa)
    .filter(filtrarPorData)
    .filter(filtrarJogosFuturos)

    const handleDateSelect = (range: DateRange | null) => {
      setDataFiltro(range || null)
      if (range?.from) {
        setFiltro("todos")
      }
    }

  return (
    <div className="container pt-12 mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Ticket Management</h1>
        <p className="text-xl text-muted-foreground">Gerencie todos os jogos e os seus ingressos!</p>
      </div>

      <div className="container mx-auto">
        <FilterControls
          filtro={filtro}
          setFiltro={setFiltro}
          pesquisa={pesquisa}
          setPesquisa={setPesquisa}
          dataFiltro={dataFiltro}
          setDataFiltro={handleDateSelect}
        />
      </div>

      <div className="container mx-auto">
        <DataTable
          columns={columns as ColumnDef<ComprehensiveTicketData, unknown>[]}
          data={ticketsFiltrados}
        />
      </div>
    </div>
  )
}