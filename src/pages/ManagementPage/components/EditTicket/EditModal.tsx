"use client"

import { Pencil } from 'lucide-react'
import { Modal, ModalTrigger, ModalBody, ModalContent } from "@/components/ui/animated-modal"
import { EditTicketForm } from './EditTicketForm'

interface EditModalProps {
  ticketId: number
  defaultValues: {
    name: string
    description: string
    active: boolean
    stock: number
  }
}

export function EditModal({ ticketId, defaultValues }: EditModalProps) {
  return (
    <Modal>
      <ModalTrigger variant={'ghost'} text="" className="h-8 w-8" icon={Pencil}>
      </ModalTrigger>
      <ModalBody className="sm:max-w-[425px]">
        <ModalContent>
          <EditTicketForm ticketId={ticketId} defaultValues={defaultValues} />
        </ModalContent>
      </ModalBody>
    </Modal>
  )
}