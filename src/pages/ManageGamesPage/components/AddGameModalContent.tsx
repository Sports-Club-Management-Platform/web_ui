"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ModalContent, ModalFooter, useModal } from '@/components/ui/animated-modal'
import { GamesService } from "@/services/Client/GamesService"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { ClubService } from "@/services/Client/ClubService"
import { cn } from "@/lib/utils"
import { ClubResponse } from '@/lib/types'
import { Loader2 } from 'lucide-react'


const formSchema = z.object({
  date_time: z.string(),
  jornada: z.number().int().positive(),
  club_home_id: z.number().int().positive(),
  club_visitor_id: z.number().int().positive(),
  pavilion_id: z.number().int().positive(),
})

export function AddGameModalContent() {
  const queryClient = useQueryClient();
  const [selectedHomeClub, setSelectedHomeClub] = useState<number>(1)
  const [selectedVisitorClub, setSelectedVisitorClub] = useState<number | null>(null)
  const { setOpen } = useModal()

  const handleHomeClubChange = (clubId: number) => {
    setSelectedHomeClub(clubId);
    queryClient.invalidateQueries({ queryKey: ["pavilion", clubId.toString()] });
  };

  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const response = await ClubService.getClubs()
      return response.data
    },
  })

  const { data: pavilion, isLoading: isPavilionLoading } = useQuery({
    queryKey: ["pavilion", selectedHomeClub],
    queryFn: async () => {
      const response = await ClubService.getPavilionByClubId(selectedHomeClub.toString())
      return response.data
    },
    enabled: !!selectedHomeClub,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date_time: '',
      jornada: 1,
      club_home_id: selectedHomeClub,
      club_visitor_id: 0,
      pavilion_id: 0,
    },
  })

  const createGame = async (values: z.infer<typeof formSchema>) => {

    const apiData = {
        ...values,
        date_time: new Date(values.date_time).toISOString(),
        score_home: 0,
        score_visitor: 0,
        finished: false,
    }
    const response = await GamesService.createGame(apiData)
    return response.data
  }

  const createGameMutation = useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] })
      setOpen(false)
    },
    onError: (error) => {
      console.error("Error creating game:", error)
    }
  })

  useEffect(() => {
    if (pavilion) {
      form.setValue('pavilion_id', pavilion.id);
    }
  }, [pavilion, form]);

  useEffect(() => {
    form.setValue('club_home_id', selectedHomeClub);
  }, [selectedHomeClub, form]);

  useEffect(() => {
    if (selectedVisitorClub) {
      form.setValue('club_visitor_id', selectedVisitorClub);
    }
  }, [selectedVisitorClub, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        await createGameMutation.mutateAsync(values)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Error creating game:", error);
    }
  }

  return (
    <ModalContent>
      <div className="space-y-4 p-6">
        <h2 className="text-2xl font-bold text-center">Adicionar Novo Jogo</h2>
        
        {/* Pavilion Display */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedHomeClub}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-transparent">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                  {isPavilionLoading ? (
                    <div className="w-full h-48 flex items-center justify-center">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  ) : (
                    <img
                      src={pavilion?.image || '/placeholder.svg'}
                      alt="Pavilion"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <p className="text-center font-medium">{isPavilionLoading ? 'Carregando...' : pavilion?.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="grid grid-cols-2 gap-32">
          {/* Home Team Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Equipa da Casa</h3>
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {clubs.map((club : ClubResponse) => (
                  <CarouselItem key={`home-${club.id}`}>
                    <Card 
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:scale-105 border-transparent items-center justify-center",
                        selectedHomeClub === club.id && "border-primary"
                      )}
                      onClick={() => handleHomeClubChange(club.id)}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                        <motion.img
                          src={club.image || '/placeholder.svg'}
                          alt={club.name}
                          className="w-32 h-32 object-contain rounded-full border-4"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        />
                        <p className="text-center font-medium">{club.name}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Visitor Team Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Equipa Visitante</h3>
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {clubs.map((club : ClubResponse) => (
                  <CarouselItem key={`visitor-${club.id}`}>
                    <Card 
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:scale-105 border-transparent",
                        selectedVisitorClub === club.id && "border-primary"
                      )}
                      onClick={() => setSelectedVisitorClub(club.id)}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                        <motion.img
                          src={club.image || '/placeholder.svg'}
                          alt={club.name}
                          className="w-32 h-32 object-contain rounded-full border-4"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        />
                        <p className="text-center font-medium">{club.name}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data e Hora</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jornada"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jornada</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <input type="hidden" {...form.register('pavilion_id')} />
            <input type="hidden" {...form.register('club_home_id')} />
            <input type="hidden" {...form.register('club_visitor_id')} />
          </form>
        </Form>
      </div>
      <ModalFooter className='bg-transparent'>
        <Button 
          onClick={form.handleSubmit(onSubmit)} 
          disabled={createGameMutation.isPending}
          className="w-full"
          type='submit'
        >
          {createGameMutation.isPending ? <Loader2 className="animate-spin h-5 w-5" /> : 'Adicionar Jogo'}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}