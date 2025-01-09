"use client"

import { useState, useMemo } from "react"
import { parseISO, isSameDay, isWithinInterval, isAfter } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { GamesService } from "@/services/Client/GamesService"
import { ClubService } from "@/services/Client/ClubService"
import { GameResponse, ClubResponse } from "@/lib/types"
import { columns } from "./components/columns"
import { DataTable } from "@/components/data-table"
import GameFilterControls from "./components/GameFilterControls"
import { ColumnDef } from "@tanstack/react-table"

interface DateRange {
  from: Date;
  to?: Date;
}

interface ComprehensiveGameData extends GameResponse {
  home_club?: ClubResponse;
  visitor_club?: ClubResponse;
}

export default function ManageGamesPage() {
  const [filtro, setFiltro] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");
  const [dataFiltro, setDataFiltro] = useState<DateRange | null>(null);

  const dataAtual = new Date();

  const { data: games = [] } = useQuery<GameResponse[]>({
    queryKey: ["games"],
    queryFn: async () => {
      const response = await GamesService.getGames();
      return response.data;
    },
  });

  const { data: clubs = [] } = useQuery<ClubResponse[]>({
    queryKey: ["clubs"],
    queryFn: async () => {
      const response = await ClubService.getClubs();
      return response.data;
    },
  });

  const comprehensiveData: ComprehensiveGameData[] = useMemo(() => {
    return games.map((game: GameResponse): ComprehensiveGameData => {
      const homeClub = clubs.find(club => club.id === game.club_home_id);
      const visitorClub = clubs.find(club => club.id === game.club_visitor_id);

      return {
        ...game,
        home_club: homeClub,
        visitor_club: visitorClub,
      };
    });
  }, [games, clubs]);

  const filtrarPorJornada = (game: ComprehensiveGameData) => {
    if (filtro === "todos" || filtro === "futuros") return true;
    return game.jornada === parseInt(filtro);
  };

  const filtrarPorPesquisa = (game: ComprehensiveGameData) => {
    const termoPesquisa = pesquisa.toLowerCase();
    return (
      game.date_time.toLowerCase().includes(termoPesquisa) ||
      game.home_club?.name.toLowerCase().includes(termoPesquisa) ||
      game.visitor_club?.name.toLowerCase().includes(termoPesquisa)
    );
  };

  const filtrarPorData = (game: ComprehensiveGameData) => {
    if (!dataFiltro) return true;
    const gameDate = parseISO(game.date_time);
    const { from, to } = dataFiltro;
    if (to) {
      return isWithinInterval(gameDate, { start: from, end: to });
    }
    return isSameDay(gameDate, from);
  };

  const filtrarJogosFuturos = (game: ComprehensiveGameData) => {
    const gameDate = parseISO(game.date_time);
    return filtro === "futuros" ? isAfter(gameDate, dataAtual) : true;
  };

  const gamesFiltrados: ComprehensiveGameData[] = comprehensiveData
    .filter(filtrarPorJornada)
    .filter(filtrarPorPesquisa)
    .filter(filtrarPorData)
    .filter(filtrarJogosFuturos);

  const handleDateSelect = (range: DateRange | null) => {
    setDataFiltro(range);
    if (range?.from) {
      setFiltro("todos");
    }
  };

  return (
    <div className="container pt-12 mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Gestão de Jogos</h1>
        <p className="text-xl text-muted-foreground">Gira todos os jogos e os detalhes!</p>
      </div>

      <div className="container mx-auto">
        <GameFilterControls
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
          columns={columns as ColumnDef<ComprehensiveGameData, unknown>[]}
          data={gamesFiltrados}
        />
      </div>
    </div>
  );
}