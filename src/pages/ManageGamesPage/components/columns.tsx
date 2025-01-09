"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format, parseISO } from "date-fns"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteGameDialog } from "./DeleteGameDialog"

export type ComprehensiveGameData = {
  id: number
  date_time: string
  jornada: number
  club_home_id: number
  club_visitor_id: number
  home_club?: { name: string }
  visitor_club?: { name: string }
}

export const columns: ColumnDef<ComprehensiveGameData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date_time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = parseISO(row.getValue("date_time"))
      return format(date, "dd/MM/yyyy HH:mm")
    },
  },
  {
    accessorKey: "jornada",
    header: "Jornada",
  },
  {
    accessorKey: "home_club.name",
    header: "Clube da Casa",
  },
  {
    accessorKey: "visitor_club.name",
    header: "Clube Visitante",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const game = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(game.id.toString())}
            >
              Copy game ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Detalhes do jogo</DropdownMenuItem>
            <DropdownMenuItem>Edição de jogo</DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteGameDialog 
                gameId={game.id} 
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]