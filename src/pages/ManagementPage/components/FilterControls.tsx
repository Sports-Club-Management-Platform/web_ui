import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Search, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal, ModalTrigger, ModalBody } from '@/components/ui/animated-modal'
import { AddTicketModalContent } from './AddTicketModalContent'
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { ValidateTicketModalContent } from "./ValidateTicketModalContent"

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
}

export default function FilterControls({
  filtro,
  setFiltro,
  pesquisa,
  setPesquisa,
  dataFiltro,
  setDataFiltro
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
          <ModalTrigger className="w-[200px] rounded-lg" variant="primary" text="Adicionar Ticket">
            Adicionar Ticket
          </ModalTrigger>
          <ModalBody>
            <AddTicketModalContent />
          </ModalBody>
        </Modal>
        <Modal>
          <ModalTrigger className="w-[200px] hover:bg-yellow-600 bg-yellow-600 rounded-lg" variant="secondary" text="Validar Ticket" icon={Check}>
            Validar Ticket
          </ModalTrigger>
          <ModalBody>
            <ValidateTicketModalContent />
          </ModalBody>
        </Modal>
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
        <Select value={filtro} onValueChange={setFiltro} disabled={!!dataFiltro}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="futuros">Jogos Futuros</SelectItem>
            <SelectItem value="todos">Todos os jogos</SelectItem>
            <SelectItem value="1">1ª Jornada</SelectItem>
            <SelectItem value="2">2ª Jornada</SelectItem>
            <SelectItem value="3">3ª Jornada</SelectItem>
            <SelectItem value="4">4ª Jornada</SelectItem>
            <SelectItem value="5">5ª Jornada</SelectItem>
            <SelectItem value="6">6ª Jornada</SelectItem>
            <SelectItem value="7">7ª Jornada</SelectItem>
            <SelectItem value="8">8ª Jornada</SelectItem>
            <SelectItem value="9">9ª Jornada</SelectItem>
            <SelectItem value="10">10ª Jornada</SelectItem>
            <SelectItem value="11">11ª Jornada</SelectItem>
            <SelectItem value="12">12ª Jornada</SelectItem>
            <SelectItem value="13">13ª Jornada</SelectItem>
            <SelectItem value="14">14ª Jornada</SelectItem>
            <SelectItem value="15">15ª Jornada</SelectItem>
            <SelectItem value="16">16ª Jornada</SelectItem>
            <SelectItem value="17">17ª Jornada</SelectItem>
            <SelectItem value="18">18ª Jornada</SelectItem>
            <SelectItem value="19">19ª Jornada</SelectItem>
            <SelectItem value="20">20ª Jornada</SelectItem>
            <SelectItem value="21">21ª Jornada</SelectItem>
            <SelectItem value="22">22ª Jornada</SelectItem>
            <SelectItem value="23">23ª Jornada</SelectItem>
            <SelectItem value="24">24ª Jornada</SelectItem>
            <SelectItem value="25">25ª Jornada</SelectItem>
            <SelectItem value="26">26ª Jornada</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}