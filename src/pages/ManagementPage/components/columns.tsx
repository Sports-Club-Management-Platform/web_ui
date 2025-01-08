"use client"

import { ColumnDef } from "@tanstack/react-table"
import {ClubResponse, GameResponse, TicketResponse} from "../../../lib/types.ts";
import {format, parseISO} from "date-fns";
import {pt} from "date-fns/locale";
import PreviewDialog from "./preview-dialog.tsx";

export interface TicketColumn {
  ticket: TicketResponse
  game: GameResponse | undefined
  home_club: ClubResponse | undefined
  visitor_club: ClubResponse | undefined
}

export const columns: ColumnDef<TicketColumn>[] = [
  {
    accessorKey: "ticket.id",
    header: "Ticket Id",
  },
  {
    header: "Price",
    cell: ({row}) => {
      const price = row.original.ticket.price;

      return (<>
        {price} €
      </>)
    }
  },
  {
    accessorKey: "ticket.name",
    header: "Nome",
  },
  {
    accessorKey: "ticket.description",
    header: "Descrição",
    cell: ({ row }) => {
      const description = row.original.ticket.description;

      return (
        <div className="truncate max-w-[300px]" title={description}>
          {description}
        </div>
      );
    },
  },
  {
    accessorKey: "ticket.active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.ticket.active;

      return (
        <div
          className={`inline-block px-2 py-1 rounded ${
            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isActive ? "Active" : "Archived"}
        </div>
      );
    },
  },
  {
    header: "Jogo",
    cell: ({ row }) => {
      const homeClub = row.original.home_club?.name || "Home Team";
      const visitorClub = row.original.visitor_club?.name || "Visitor Team";

      return (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{homeClub}</span>
          <span className="text-gray-500">VS</span>
          <span className="font-semibold">{visitorClub}</span>
        </div>
      );
    },
  },
  {
    header: "Jornada",
    cell: ({ row }) => {
      return (<>{`Jornada ${row.original.game?.jornada || ""}`}</>)
    }
  },
  {
    header: "Data",
    cell: ({ row }) => {
      return <>{row.original.game ? format(parseISO(row.original.game.date_time), "d MMMM 'de' yyyy", { locale: pt }) : "N/A"}</>
    },
  },
  {
    header: "Hora",
    cell: ({ row }) => {
      return <>{row.original.game ? format(parseISO(row.original.game.date_time), "HH:mm") : "N/A"}</>
    },
  },
  {
    header: "Preview",
    cell: ({ row }) => {
      return <PreviewDialog ticketData={row.original} />
    },
  }

]
