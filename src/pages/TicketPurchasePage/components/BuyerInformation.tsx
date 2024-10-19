import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard } from "lucide-react"

interface BuyerInformationProps {
  name: string
  setName: (name: string) => void
  email: string
  setEmail: (email: string) => void
  isChangingEmail: boolean
  setIsChangingEmail: (isChanging: boolean) => void
  onContinueToPayment: () => void
}

export default function BuyerInformation({
  name,
  setName,
  email,
  setEmail,
  isChangingEmail,
  setIsChangingEmail,
  onContinueToPayment
}: BuyerInformationProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md text-white">
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold mb-4">Informações do Comprador</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            {isChangingEmail ? (
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white"
                required
              />
            ) : (
              <div className="flex items-center">
                <span className="flex-grow">{email}</span>
                <Button variant="link" onClick={() => setIsChangingEmail(true)}>
                  Alterar
                </Button>
              </div>
            )}
          </div>
          <Button 
            onClick={onContinueToPayment} 
            className="w-full mt-4"
          >
            <CreditCard className="mr-2 h-4 w-4" /> Continuar para Pagamento
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}