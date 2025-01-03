import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon, Search, X } from "lucide-react"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
            placeholder="Pesquisar por data ou equipe"
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