"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ModalFooter, ModalCancelButton, useModal } from "@/components/ui/animated-modal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TicketService } from "@/services/Client/TicketService"
import { Loader2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { ConfirmationDialog } from "@/components/confirmation-dialog"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  active: z.boolean(),
  stock: z.number().min(0, {
    message: "O stock não pode ser negativo.",
  }),
})

interface EditTicketFormProps {
  ticketId: number
  defaultValues: {
    name: string
    description: string
    active: boolean
    stock: number
  }
}

export function EditTicketForm({ ticketId, defaultValues }: EditTicketFormProps) {
  const { setOpen, setVisible } = useModal()
  const { toast } = useToast()
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema> | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const queryClient = useQueryClient()

  const editTicket = async (values: z.infer<typeof formSchema>) => {
    const response = await TicketService.updateTicket(ticketId.toString(), values)
    return response.data
  }

  const editTicketMutation = useMutation({
    mutationFn: editTicket,
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Ticket atualizado com sucesso.",
      })
      queryClient.invalidateQueries({ queryKey: ["tickets"] })
      queryClient.invalidateQueries({ queryKey: ["stock", ticketId] })
      setVisible(false)
      setTimeout(() => setOpen(false), 300) // Delay closing to allow for fade out animation
    },
    onError: (error) => {
      console.error("Erro ao atualizar o ticket:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o ticket. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setFormValues(values)
    setIsConfirmationOpen(true)
    setVisible(false)
  }

  const handleConfirm = async () => {
    if (formValues) {
      await editTicketMutation.mutateAsync(formValues)
    }
    setIsConfirmationOpen(false)
  }

  const handleCancel = () => {
    setIsConfirmationOpen(false)
    setVisible(true)
  }

  return (
    <>
      <div className="space-y-4 py-2 pb-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-center">Editar Bilhete</h2>
          <p className="text-sm text-muted-foreground text-center">
            Faça alterações nos detalhes do bilhete abaixo.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do bilhete" {...field} />
                  </FormControl>
                  <FormDescription>
                    O nome do bilhete que será exibido para os compradores.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição do bilhete"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Uma breve descrição do bilhete e o que ele inclui.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Ativo</FormLabel>
                    <FormDescription>
                      Determina se o bilhete está disponível para venda.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    A quantidade de bilhetes disponíveis para venda.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ModalFooter className="bg-transparent flex justify-center space-x-4">
              {editTicketMutation.isPending ? (
                <Button type="submit" disabled>
                  <Loader2 className="animate-spin h-5 w-5" />
                </Button>
              ) : (
                <Button type="submit">
                  Guardar Alterações
                </Button>
              )}
              <ModalCancelButton>Cancelar</ModalCancelButton>
            </ModalFooter>
          </form>
        </Form>
      </div>
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  )
}