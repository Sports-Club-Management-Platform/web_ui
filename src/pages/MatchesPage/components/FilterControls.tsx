import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon, Search } from "lucide-react"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FilterControls({ filtro, setFiltro, pesquisa, setPesquisa, dataFiltro, setDataFiltro }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex flex-wrap justify-center md:justify-start gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dataFiltro ? format(dataFiltro, "PPP") : <span>Selecionar data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dataFiltro}
              onSelect={(date) => {
                setDataFiltro(date)
                setFiltro(date ? "semana" : "todos")
              }}
              initialFocus
            />
            {dataFiltro && (
              <div className="flex justify-center space-x-2 p-2 border-t">
                <Button
                  variant={filtro === "semana" ? "default" : "outline"}
                  onClick={() => setFiltro("semana")}
                  size="sm"
                >
                  Semana
                </Button>
                <Button
                  variant={filtro === "mes" ? "default" : "outline"}
                  onClick={() => setFiltro("mes")}
                  size="sm"
                >
                  Mês
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
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
        <Select value={filtro} onValueChange={setFiltro}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="futuros">Jogos Futuros</SelectItem>
            <SelectItem value="todos">Todos os jogos</SelectItem>
            <SelectItem value="1">1º Trimestre</SelectItem>
            <SelectItem value="2">2º Trimestre</SelectItem>
            <SelectItem value="3">3º Trimestre</SelectItem>
            <SelectItem value="4">4º Trimestre</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}