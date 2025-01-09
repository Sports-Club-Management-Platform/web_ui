"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from 'lucide-react'
import { Modal, ModalTrigger, ModalBody } from '@/components/ui/animated-modal'
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { JornadaSelect } from "./jornada-select"

interface DateRange {
  from: Date;
  to?: Date;
}

interface FilterControlsProps {
  readonly filtro: string;
  readonly setFiltro: (filtro: string) => void;
  readonly pesquisa: string;
  readonly setPesquisa: (pesquisa: string) => void;
  readonly dataFiltro: DateRange | null;
  readonly setDataFiltro: (data: DateRange | null) => void;
  readonly addButtonText: string;
  readonly addModalContent: React.ReactNode;
  readonly extraButtons?: React.ReactNode;
}

export default function GenericFilterControls({
  filtro,
  setFiltro,
  pesquisa,
  setPesquisa,
  dataFiltro,
  setDataFiltro,
  addButtonText,
  addModalContent,
  extraButtons
}: FilterControlsProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex flex-wrap justify-center md:justify-start gap-2">
        <DateRangePicker
          onUpdate={({ range }) => setDataFiltro(range)}
          initialDateFrom={dataFiltro?.from}
          initialDateTo={dataFiltro?.to}
          align="start"
          locale={"pt"}
          showCompare={false}
        />
        {dataFiltro && (
          <Button variant="ghost" onClick={() => setDataFiltro(null)} size="icon">
            <X className="h-4 w-4" />
          </Button>
        )}
        <Modal>
          <ModalTrigger className="w-[200px] rounded-lg" variant="primary" text={addButtonText}>
            {addButtonText}
          </ModalTrigger>
          <ModalBody className="w-full max-w-3xl">
            {addModalContent}
          </ModalBody>
        </Modal>
        {extraButtons}
      </div>
      <div className="flex space-x-2 w-full md:w-auto">
        <div className="relative flex-grow md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por data ou equipa"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="pl-8"
          />
        </div>
        <JornadaSelect value={filtro} onValueChange={setFiltro} disabled={!!dataFiltro} />
      </div>
    </div>
  )
}