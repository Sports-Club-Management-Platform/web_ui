"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ClubResponse, GameResponse, TicketResponse, StockResponse } from "@/lib/types.ts"
import { format, parseISO } from "date-fns"
import { pt } from "date-fns/locale"
import PreviewDialog from "./preview-dialog.tsx"
import { ArrowUpDown } from 'lucide-react'
import { EditModal } from "./EditTicket/EditModal.tsx"

export interface ComprehensiveTicketData {
  ticket: TicketResponse
  game: GameResponse | undefined
  home_club: ClubResponse | undefined
  visitor_club: ClubResponse | undefined
  stock: number | undefined
  fullGameData: GameResponse
  fullHomeClubData: ClubResponse
  fullVisitorClubData: ClubResponse
  fullStockData: StockResponse
}

export const columns: ColumnDef<ComprehensiveTicketData>[] = [
  {
    accessorKey: "ticket.id",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ticket Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
  },
  {
    accessorKey: "ticket.price",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({row}) => {
      const price = row.original.ticket.price;
      return <>{price} €</>
    },
  },
  {
    accessorKey: "ticket.name",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
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
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
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
      const homeClub = row.original.fullHomeClubData?.name || "Home Team";
      const visitorClub = row.original.fullVisitorClubData?.name || "Visitor Team";
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
    accessorKey: "fullGameData.jornada",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jornada
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      return (<>{`Jornada ${row.original.fullGameData?.jornada || ""}`}</>)
    }
  },
  {
    accessorKey: "fullGameData.date_time",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      return <>{row.original.fullGameData ? format(parseISO(row.original.fullGameData.date_time), "d MMMM 'de' yyyy", { locale: pt }) : "N/A"}</>
    },
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = rowA.original.fullGameData ? parseISO(rowA.original.fullGameData.date_time) : new Date(0);
      const dateB = rowB.original.fullGameData ? parseISO(rowB.original.fullGameData.date_time) : new Date(0);
      return dateA.getTime() - dateB.getTime();
    },
  },
  {
    accessorKey: "fullGameData.date_time",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hora
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      return <>{row.original.fullGameData ? format(parseISO(row.original.fullGameData.date_time), "HH:mm") : "N/A"}</>
    },
    sortingFn: (rowA, rowB, columnId) => {
      const timeA = rowA.original.fullGameData ? parseISO(rowA.original.fullGameData.date_time).getTime() % (24 * 60 * 60 * 1000) : 0;
      const timeB = rowB.original.fullGameData ? parseISO(rowB.original.fullGameData.date_time).getTime() % (24 * 60 * 60 * 1000) : 0;
      return timeA - timeB;
    },
  },
  {
    accessorKey: "fullStockData.stock",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const stock = row.original.fullStockData?.stock;
      return <>{stock !== undefined ? stock : 'N/A'}</>
    },
  },
  {
    header: "Preview",
    cell: ({ row }) => {
      return <PreviewDialog ticketData={row.original} />
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ticket = row.original.ticket
      return (
        <EditModal 
          ticketId={ticket.id}
          defaultValues={{
            name: ticket.name,
            description: ticket.description,
            active: ticket.active,
            stock: row.original.fullStockData?.stock || 0
          }}
        />
      )
    },
  },
]