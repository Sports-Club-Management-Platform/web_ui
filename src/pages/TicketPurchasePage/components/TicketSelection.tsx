import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TicketSelectionProps {
  game: {
    preco: number
    disponivel: number
  }
  selectedTickets: number
  onTicketChange: (quantity: number) => void
}

export default function TicketSelection({ game, selectedTickets, onTicketChange }: TicketSelectionProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md">
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-white">Seleção de Bilhetes</h3>
        <div className="flex items-center justify-between mb-4 text-white">
          <span>Preço por bilhete:</span>
          <span className="font-semibold text-white">{game.preco.toFixed(2)}€</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-white">Quantidade:</span>
          <div className="flex items-center">
            <Button variant="outline" size="sm" onClick={() => onTicketChange(Math.max(1, selectedTickets - 1))}>-</Button>
            <Input
              type="number"
              min="1"
              max={game.disponivel}
              value={selectedTickets}
              onChange={(e) => onTicketChange(parseInt(e.target.value))}
              className="w-16 mx-2 text-center bg-transparent text-white"
            />
            <Button variant="outline" size="sm" onClick={() => onTicketChange(Math.min(game.disponivel, selectedTickets + 1))}>+</Button>
          </div>
        </div>
        <div className="flex items-center text-white justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>{(game.preco * selectedTickets).toFixed(2)}€</span>
        </div>
      </CardContent>
    </Card>
  )
}