"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ModalContent, ModalFooter, ModalCancelButton } from '@/components/ui/animated-modal'
import { ConfettiButton } from "@/components/ui/confetti"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useMutation } from '@tanstack/react-query'
import { TicketService } from '@/services/Client/TicketService'

const FormSchema = z.object({
  ticketCode: z.string().length(13, {
    message: "O código do ticket deve ter 13 dígitos.",
  }).regex(/^\d+$/, "O código do ticket deve conter apenas números"),
})

interface TicketValidationResult {
  user_id: string
  ticket_id: number
  unit_amount: number
  created_at: string
  is_active: boolean
  deactivated_at: string | null
}

export function ValidateTicketModalContent() {
  const [validationResult, setValidationResult] = useState<TicketValidationResult | null>(null)
  const [isValidated, setIsValidated] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ticketCode: "",
    },
  })

  const validateTicket = async (ticketCode: string) => {
    const response = await TicketService.validateTicket(ticketCode)
    return response.data
  }  

  const validateTicketMutation = useMutation({
    mutationFn: validateTicket,
    onSuccess: (data) => {
      setValidationResult(data)
      setIsValidated(true)
    },
    onError: (error) => {
        form.setError("ticketCode", {
            type: "manual",
            message: "O código do ticket é inválido.",
        })
        console.error("Erro ao validar ticket:", error)
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    validateTicketMutation.mutate(data.ticketCode)
  }

  return (
    <ModalContent>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Validar Ticket</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-center items-center flex flex-col">
            <FormField
              control={form.control}
              name="ticketCode"
              render={({ field }) => (
                <FormItem className='justify-center'>
                  <FormLabel>Código do Ticket</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={13} {...field} pattern={REGEXP_ONLY_DIGITS}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={8} />
                        <InputOTPSlot index={9} />
                        <InputOTPSlot index={10} />
                        <InputOTPSlot index={11} />
                        <InputOTPSlot index={12} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Por favor, insira o código de 13 dígitos do ticket.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ConfettiButton type="submit" className="w-full">
              Validar
            </ConfettiButton>
          </form>
        </Form>
        {validationResult && (
          <Card className="mt-4 bg-transparent transition-all duration-500 ease-in-out max-h-0 overflow-hidden" style={{ maxHeight: isValidated ? '1000px' : '0' }}>
            <CardHeader>
              <CardTitle>Resultado da Validação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="transition-opacity duration-500 ease-in-out" style={{ opacity: isValidated ? 1 : 0 }}>
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">ID do Usuário:</span>
                    <span>{validationResult.user_id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">ID do Ticket:</span>
                    <span>{validationResult.ticket_id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Valor:</span>
                    <span>{validationResult.unit_amount.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Data de Criação:</span>
                    <span>{format(new Date(validationResult.created_at), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: pt })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Status:</span>
                    <Badge className={validationResult.is_active ? "bg-green-300" : "bg-red-300"}>
                      {validationResult.is_active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                  {validationResult.deactivated_at && (
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Data de Desativação:</span>
                      <span>{format(new Date(validationResult.deactivated_at), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: pt })}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <ModalFooter className='bg-transparent justify-center space-x-4'>
        {isValidated && (
          <ModalCancelButton>Fechar</ModalCancelButton>
        )}
      </ModalFooter>
    </ModalContent>
  )
}