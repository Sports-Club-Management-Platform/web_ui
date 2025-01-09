import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Search, X } from 'lucide-react'
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { JornadaSelect } from "@/components/jornada-select"

interface FilterControlsProps {
  filtro: string
  setFiltro: (filtro: string) => void
  pesquisa: string
  setPesquisa: (pesquisa: string) => void
  dataFiltro: Date | null
  setDataFiltro: (data: Date | null) => void
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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dataFiltro ? format(dataFiltro, "PPP", { locale: pt }) : <span>Selecionar data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dataFiltro ?? undefined}
              onSelect={(date) => setDataFiltro(date ?? null)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {dataFiltro && (
          <Button variant="ghost" onClick={() => setDataFiltro(null)} size="icon">
            <X className="h-4 w-4" />
          </Button>
        )}
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