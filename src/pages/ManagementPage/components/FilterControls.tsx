"use client"

import GenericFilterControls from '@/components/generic-filter-controls'
import { AddTicketModalContent } from './AddTicketModalContent'
import { ValidateTicketModalContent } from "./ValidateTicketModalContent"
import { Modal, ModalTrigger, ModalBody } from '@/components/ui/animated-modal'
import { Check } from 'lucide-react'

interface DateRange {
  from: Date;
  to?: Date;
}

interface TicketFilterControlsProps {
  readonly filtro: string;
  readonly setFiltro: (filtro: string) => void;
  readonly pesquisa: string;
  readonly setPesquisa: (pesquisa: string) => void;
  readonly dataFiltro: DateRange | null;
  readonly setDataFiltro: (data: DateRange | null) => void;
}

export default function TicketFilterControls(props: TicketFilterControlsProps) {
  const validateTicketButton = (
    <Modal>
      <ModalTrigger className="w-[200px] hover:bg-yellow-600 bg-yellow-600 rounded-lg" variant="secondary" text="Validar Ticket" icon={Check}>
        Validar Ticket
      </ModalTrigger>
      <ModalBody>
        <ValidateTicketModalContent />
      </ModalBody>
    </Modal>
  )

  return (
    <GenericFilterControls
      {...props}
      addButtonText="Adicionar Ticket"
      addModalContent={<AddTicketModalContent />}
      extraButtons={validateTicketButton}
    />
  )
}