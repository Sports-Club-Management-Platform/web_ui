"use client"

import { useState } from "react"
import { parseISO, isSameDay } from "date-fns"
import { useTheme } from "@/components/theme-provider"
import FilterControls from "./components/FilterControls"
import { GameResponse, ClubResponse } from "@/lib/types"
import { GamesService } from "@/services/Client/GamesService"
import { ClubService } from "@/services/Client/ClubService"
import { useQuery } from "@tanstack/react-query"
import {columns, TicketColumn} from "./components/columns.tsx";
import {DataTable} from "./components/data-table.tsx";
import {TicketResponse} from "../../lib/types.ts";
import {TicketService} from "../../services/Client/TicketService.tsx";

export default function MatchesPage() {
  const [filtro, setFiltro] = useState("todos")
  const [pesquisa, setPesquisa] = useState("")
  const [dataFiltro, setDataFiltro] = useState<Date | null>(null)
  const { theme } = useTheme()

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

  const getClubById = (id: number) => clubs.find(club => club.id === id)

  const columnData: TicketColumn[] = tickets.map((ticket: TicketResponse): TicketColumn => {
    const game: GameResponse = jogos.find(game => game.id === ticket.game_id);
    return {
      ticket: ticket,
      game: game,
      home_club: getClubById(game?.club_home_id),
      visitor_club: getClubById(game?.club_visitor_id)
    };
  });

  const filtrarPorJornada = (ticket: TicketColumn) => {
    if (dataFiltro || filtro === "todos" || filtro === "futuros") return true
    return ticket.game?.jornada === parseInt(filtro)
  }

  const filtrarPorPesquisa = (ticket: TicketColumn) => {
    const termoPesquisa = pesquisa.toLowerCase()
    const clubeCasa = ticket.home_club
    const clubeVisitante = ticket.visitor_club
    return (
      ticket.game?.date_time.includes(termoPesquisa) ||
      clubeCasa?.name.toLowerCase().includes(termoPesquisa) ||
      clubeVisitante?.name.toLowerCase().includes(termoPesquisa)
    )
  }

  const filtrarPorData = (ticket: TicketColumn) => {
    if (!dataFiltro) return true
    return isSameDay(parseISO(ticket.game.date_time), dataFiltro)
  }

  const filtrarJogosFuturos = (ticket: TicketColumn) => {
    if (dataFiltro) return true
    return filtro === "futuros" ? parseISO(ticket.game.date_time) > dataAtual : true
  }

  // why is this not working
  const ticketsFiltrados: TicketColumn[] = columnData
    .filter(filtrarPorJornada)
    .filter(filtrarPorPesquisa)
    .filter(filtrarPorData)
    .filter(filtrarJogosFuturos)

  const handleDateSelect = (date: Date | null) => {
    setDataFiltro(date)
    if (date) {
      setFiltro("todos")
    }
  }

  return (
    <div className="container pt-36 mx-auto p-4 space-y-6">

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
          columns={columns}
          data={ticketsFiltrados}
        />
      </div>


    </div>
  )
}