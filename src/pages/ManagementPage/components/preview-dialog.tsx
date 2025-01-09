"use client"

import { useEffect, useState } from 'react'
import { TextSearch } from 'lucide-react'
import { ComprehensiveTicketData } from "./columns.tsx"
import { Modal, ModalTrigger, ModalBody, ModalContent } from "@/components/ui/animated-modal.tsx"
import { format, parseISO } from "date-fns"
import { pt } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface PreviewDialogProps {
  ticketData: ComprehensiveTicketData
}

export default function PreviewDialog({ ticketData }: PreviewDialogProps) {
  const [imageAspectRatio, setImageAspectRatio] = useState<number>(1)

  useEffect(() => {
    if (ticketData.ticket.stripe_image_url) {
      const img = new Image()
      img.onload = () => {
        setImageAspectRatio(img.width / img.height)
      }
      img.src = ticketData.ticket.stripe_image_url
    }
  }, [ticketData.ticket.stripe_image_url])

  const isSquareOrPortrait = imageAspectRatio <= 1.2

  return (
    <Modal>
      <ModalTrigger variant='ghost' text='' className='w-8 h-8' icon={TextSearch}>
      </ModalTrigger>
      <ModalBody className="w-full max-w-3xl">
        <ModalContent>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Pré-visualização do Bilhete</h2>
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  ticketData.ticket.active ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                }`}
              >
                {ticketData.ticket.active ? "Ativo" : "Arquivado"}
              </div>
            </div>
            
            <div className={cn(
              "grid gap-6",
              isSquareOrPortrait ? "grid-cols-1 md:grid-cols-2" : "grid-cols-3"
            )}>
              <div className={cn(
                "relative",
                isSquareOrPortrait ? "md:col-span-1" : "col-span-1"
              )}>
                <img
                  src={ticketData.ticket.stripe_image_url}
                  alt="Imagem do Bilhete"
                  className="w-full h-auto rounded-xl shadow-md"
                />
              </div>
              <div className={cn(
                "space-y-6",
                isSquareOrPortrait ? "md:col-span-1" : "col-span-2"
              )}>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{ticketData.ticket.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{ticketData.ticket.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Preço</h4>
                    <p className="text-2xl font-bold text-emerald-600">{ticketData.ticket.price} €</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Stock</h4>
                    <p className="text-2xl font-bold">{ticketData.fullStockData?.stock || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-bold mb-4">Informação do Jogo</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Equipas</h4>
                  <p className="mt-1 font-medium">{ticketData.fullHomeClubData?.name} vs {ticketData.fullVisitorClubData?.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Jornada</h4>
                  <p className="mt-1 font-medium">{ticketData.fullGameData?.jornada}ª Jornada</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Data</h4>
                  <p className="mt-1 font-medium">{ticketData.fullGameData ? format(parseISO(ticketData.fullGameData.date_time), "d 'de' MMMM 'de' yyyy", { locale: pt }) : 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Hora</h4>
                  <p className="mt-1 font-medium">{ticketData.fullGameData ? format(parseISO(ticketData.fullGameData.date_time), "HH:mm") : 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-bold mb-4">Informação Adicional</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">ID do Bilhete</h4>
                  <p className="mt-1 font-medium font-mono">{ticketData.ticket.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">ID do Stripe</h4>
                  <p className="mt-1 font-medium font-mono">{ticketData.ticket.stripe_price_id}</p>
                </div>
              </div>
            </div>
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  )
}