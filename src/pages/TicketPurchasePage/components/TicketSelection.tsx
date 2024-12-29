import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {CreditCard} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import {PaymentsService} from "../../../services/Client/PaymentsService.tsx";
import {TicketResponse} from "../../../lib/types.ts";

interface TicketSelectionProps {
  selectedNumberTickets: number
  ticketData: TicketResponse
  onTicketChange: (quantity: number) => void
}

export default function TicketSelection({ selectedNumberTickets, ticketData, onTicketChange }: TicketSelectionProps) {
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
        <div className="flex items-center justify-between mb-4">
          <span className="text-white">Quantidade:</span>
          <div className="flex items-center">
            <Button variant="outline" size="sm"
                    onClick={() => onTicketChange(Math.max(1, selectedNumberTickets - 1))}>-</Button>
            <Input
                type="number"
                min="1"
                max={100}
                value={selectedNumberTickets}
                onChange={(e) => onTicketChange(parseInt(e.target.value))}
                className="w-16 mx-2 text-center bg-transparent text-white"
            />
            <Button variant="outline" size="sm"
                    onClick={() => onTicketChange(Math.min(100, selectedNumberTickets + 1))}>+</Button>
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
        >
          <CreditCard className="mr-2 h-4 w-4"/> Continuar para Pagamento
        </Button>
      </CardContent>
    </Card>
  )
}