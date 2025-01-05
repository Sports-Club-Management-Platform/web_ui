"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { ModalContent, ModalFooter, useModal } from "@/components/ui/animated-modal"
import { Switch } from "@/components/ui/switch"
import { FileUpload } from "@/components/ui/file-upload"
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query"
import { GamesService } from "@/services/Client/GamesService"
import { TicketService } from "@/services/Client/TicketService"
import { GameResponse, TicketPost } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

const formSchema = z.object({
  game_id: z.string().min(1, { message: "Por favor, selecione um jogo." }),
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "Descrição deve ter pelo menos 10 caracteres.",
  }),
  active: z.boolean().default(true),
  price: z.number().positive({
    message: "Preço deve ser um valor positivo.",
  }),
  image: z.any(),
  stock: z.number().int().positive({
    message: "Quantidade em estoque deve ser um número positivo.",
  }),
})

export function AddTicketModalContent() {
  const { setOpen } = useModal()
  const queryClient = useQueryClient()
  const [selectedGame, setSelectedGame] = useState("")

  const { data: jogos = [] } = useQuery<GameResponse[]>({
    queryKey: ["games"],
    queryFn: async () => {
      const response = await GamesService.getGames()
      return response.data
    },
  })

  const createTicket = async (data: z.infer<typeof formSchema>) => {
  
    const apiData = {
      ...data,
      game_id: parseInt(data.game_id),
    };
  
    const response = await TicketService.createTicket(apiData as TicketPost);
    setOpen(false);
    return response.data;
  }

  const createTicketMutation = useMutation({
    mutationFn: createTicket,
    onError: (error) => {
      console.error("Erro ao criar ticket:", error)
    },
    onSuccess: () => {
        console.log("Ticket criado com sucesso!")
        queryClient.invalidateQueries("tickets")
        },
  })

  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      active: true,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        // Here you would send the data to your API
        await createTicketMutation.mutateAsync(values)
        form.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ModalContent className="flex-grow overflow-auto">
        <h2 className="text-2xl font-bold mb-6">Adicionar Novo Ticket</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="game_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jogo</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        setSelectedGame(value)
                      }}
                      value={selectedGame}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um jogo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jogos.map((jogo) => (
                          <SelectItem
                            key={jogo.id}
                            value={jogo.id.toString()}
                            onMouseDown={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                            }}
                          >
                            Jornada {jogo.jornada}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Selecione o jogo associado a este ticket.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Ticket</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Bilhete Porto X Candelária" {...field} />
                    </FormControl>
                    <FormDescription>
                      Dê um nome descritivo para o ticket.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-6">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Preço</FormLabel>
                        <FormControl>
                        <Input 
                            type="number" 
                            placeholder="Ex: 50.00"
                            {...field} 
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                        </FormControl>
                        <FormDescription>
                        Defina o preço do ticket em euros.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Quantidade em Estoque</FormLabel>
                        <FormControl>
                        <Input 
                            type="number" 
                            placeholder="Ex: 100"
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                        </FormControl>
                        <FormDescription>
                        Indique quantos tickets estão disponíveis para venda.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Imagem</FormLabel>
                    <FormControl>
                      <FileUpload
                        onChange={(files) => onChange(files[0])}
                        value={value ? [value] : []}
                        accept="image/*"
                        maxSize={5 * 1024 * 1024} // 5MB
                      />
                    </FormControl>
                    <FormDescription>
                      Faça upload de uma imagem representativa para o ticket (máx. 5MB).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descreva os detalhes do ticket" {...field} />
                  </FormControl>
                  <FormDescription>
                    Forneça uma descrição detalhada do ticket e seus benefícios.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Ativo</FormLabel>
                      <FormDescription>
                        Determina se o ticket está disponível para venda.
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
          </form>
        </Form>
      </ModalContent>
      <ModalFooter className="border-t sticky bottom-0 bg-background z-10">
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Adicionar Ticket
          </Button>
        </div>
      </ModalFooter>
    </div>
  )
}