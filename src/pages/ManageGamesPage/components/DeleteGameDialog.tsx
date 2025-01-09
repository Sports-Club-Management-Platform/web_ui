"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { GamesService } from "@/services/Client/GamesService"
import { useToast } from "@/hooks/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface DeleteGameDialogProps {
  gameId: number
}

export function DeleteGameDialog({ gameId }: DeleteGameDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: number) => GamesService.deleteGame(id),
    onSuccess: () => {
      toast({
        title: "Jogo eliminado",
        description: "O jogo foi eliminado com sucesso.",
      })
      setIsOpen(false)
      queryClient.invalidateQueries({ queryKey: ['games'] })
    },
    onError: (error) => {
      console.error("Error deleting game:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao eliminar o jogo. Por favor, tente novamente.",
        variant: "destructive",
      })
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate(gameId)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} size="sm" className="-translate-x-3">Eliminar jogo</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja eliminar este jogo?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isto irá eliminar permanentemente o jogo e todos os dados associados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? "Eliminando..." : "Sim, eliminar jogo"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}