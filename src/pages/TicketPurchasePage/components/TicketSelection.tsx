import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard } from 'lucide-react';
import { useMutation } from "@tanstack/react-query";
import { PaymentsService } from "@/services/Client/PaymentsService.tsx";
import { TicketResponse } from "@/lib/types.ts";

interface TicketSelectionProps {
  selectedNumberTickets: number
  ticketData: TicketResponse
  onTicketChange: (quantity: number) => void
  stock: number | undefined
  isStockAvailable: boolean
}

export default function TicketSelection({ selectedNumberTickets, ticketData, onTicketChange, stock, isStockAvailable }: TicketSelectionProps) {
  const createCheckoutSession = async () => {
    const checkout_session = (await PaymentsService.create_checkout_session(
        ticketData.stripe_price_id, selectedNumberTickets
    )).data;
    return checkout_session;
  };

  const checkoutSessionMutation = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (data) => {
      console.log(data.checkout_url)
      window.location.href=data.checkout_url
    },
    onError: (error) => {
      console.error("Redirect falhou", error.message);
    }
  });

  const onSubmit = () => {
    checkoutSessionMutation.mutate();
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md">
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-white">Seleção de Bilhetes</h3>
        <div className="flex items-center justify-between mb-4 text-white">
          <span>Preço por bilhete:</span>
          <span className="font-semibold text-white">{ticketData.price.toFixed(2)}€</span>
        </div>
        <div className="flex items-center justify-between mb-4 text-white">
          <span>Stock disponível:</span>
          <span className="font-semibold text-white">{stock !== undefined ? stock : 'N/A'}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-white">Quantidade:</span>
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onTicketChange(Math.max(1, selectedNumberTickets - 1))}
              disabled={selectedNumberTickets <= 1}
            >
              -
            </Button>
            <Input
              type="number"
              min="1"
              max={stock}
              value={selectedNumberTickets}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  onTicketChange(Math.min(stock || Infinity, Math.max(1, value)));
                }
              }}
              className="w-16 mx-2 text-center bg-transparent text-white"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onTicketChange(Math.min(stock || Infinity, selectedNumberTickets + 1))}
              disabled={!isStockAvailable || (stock !== undefined && selectedNumberTickets >= stock)}
            >
              +
            </Button>
          </div>
        </div>
        <div className="flex items-center text-white justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>{(ticketData.price * selectedNumberTickets).toFixed(2)}€</span>
        </div>
        <Button
          className="w-full mt-4"
          type="submit"
          onClick={onSubmit}
          disabled={!isStockAvailable}
        >
          <CreditCard className="mr-2 h-4 w-4"/> 
          {isStockAvailable ? 'Continuar para Pagamento' : 'Stock Insuficiente'}
        </Button>
      </CardContent>
    </Card>
  )
}