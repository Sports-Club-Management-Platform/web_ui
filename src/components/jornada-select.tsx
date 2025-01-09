import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface JornadaSelectProps {
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
}

export function JornadaSelect({ value, onValueChange, disabled = false }: JornadaSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione o período" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="futuros">Jogos Futuros</SelectItem>
        <SelectItem value="todos">Todos os jogos</SelectItem>
        {Array.from({ length: 26 }, (_, i) => (
          <SelectItem key={i + 1} value={(i + 1).toString()}>
            {i + 1}ª Jornada
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}