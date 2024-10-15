import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '@/stores/useUserStore'
import { UserService } from "../../services/Client/UserService";
import { useEffect, useState } from "react";
import { format, parseISO, isBefore } from "date-fns"
import { pt } from "date-fns/locale"
import { Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


const mockGames = [
    {
      id: 1,
      data: "2024-12-15T20:00:00",
      equipeA: "Candelária SC",
      equipeB: "Sporting CP",
      local: "Pavilhão da Luz",
      imagemA: "https://picsum.photos/seed/CandelariaSC/200",
      imagemB: "https://picsum.photos/seed/SportingCP/200"
    },
    {
      id: 2,
      data: "2024-12-22T19:30:00",
      equipeA: "FC Porto",
      equipeB: "Candelária SC",
      local: "Dragão Arena",
      imagemA: "https://picsum.photos/seed/FCPorto/200",
      imagemB: "https://picsum.photos/seed/CandelariaSC/200"
    },
    {
      id: 3,
      data: "2024-03-29T21:00:00",
      equipeA: "Candelária SC",
      equipeB: "SL Benfica",
      local: "Pavilhão da Luz",
      imagemA: "https://picsum.photos/seed/CandelariaSC/200",
      imagemB: "https://picsum.photos/seed/SLBenfica/200"
    },
    {
      id: 4,
      data: "2024-04-05T18:00:00",
      equipeA: "Oliveirense",
      equipeB: "Candelária SC",
      local: "Pavilhão Dr. Salvador Machado",
      imagemA: "https://picsum.photos/seed/Oliveirense/200",
      imagemB: "https://picsum.photos/seed/CandelariaSC/200"
    }
  ]

export default function LandingPage() {

    const { token, setUserInformation } = useUserStore();
    const [highlightedGame, setHighlightedGame] = useState(null)

    console.log("Token acessado na LandingPage:", token); // Verifica se o token é acessado

    const fetchUser = async () => {
        const response = await UserService.getUser();
        return response.data;
    }

    const { data } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        enabled: !!token,
    })

    useEffect(() => {
        console.log("Data do usuário:", data);
        if (data && token){
            setUserInformation(data);
        }
    }, [data, setUserInformation, token]);

    useEffect(() => {
        if (mockGames.length > 0) {
          const sortedGames = [...mockGames].sort((a, b) => parseISO(a.data).getTime() - parseISO(b.data).getTime())
          const nextGame = sortedGames.find(game => isBefore(new Date(), parseISO(game.data)))
          setHighlightedGame(nextGame || sortedGames[0])
        }
      }, [])
    
    const handleGameClick = (game) => {
        setHighlightedGame(game)
      }
    
    const isNextGame = (game) => {
        return game.id === mockGames.find(g => isBefore(new Date(), parseISO(g.data)))?.id
      }

    return (
        <div>
            <div className="relative flex flex-col min-h-screen">
                {/* Background image */}
                <div
                    className="absolute bg-cover bg-center filter blur-sm h-full w-full"
                    style={{ backgroundImage: "url('/src/assets/bg-landing_page.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-20"></div>
                {/* Content */}
                <div className="relative flex-grow bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                        Bem-vindo à plataforma do Candelária Sport Clube!
                    </h1>
                    <div className="space-x-4">
                        <Button size="lg">Tornar-se Sócio</Button>
                        <Button size="lg">Comprar Bilhetes</Button>
                    </div>
                </div>
            </div>
            {/* Highlighted Game */}
            {highlightedGame && (
                <Card className="mx-auto max-w-6xl mt-8 bg-primary text-primary-foreground">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                        {isNextGame(highlightedGame) ? "Próximo Jogo" : "Jogo em Destaque"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                        <div className="text-center">
                            <img src={highlightedGame.imagemA} alt={highlightedGame.equipeA} className="w-24 h-24 mx-auto rounded-full" />
                            <h3 className="mt-2 font-semibold">{highlightedGame.equipeA}</h3>
                        </div>
                        <div className="text-4xl font-bold">VS</div>
                        <div className="text-center">
                            <img src={highlightedGame.imagemB} alt={highlightedGame.equipeB} className="w-24 h-24 mx-auto rounded-full" />
                            <h3 className="mt-2 font-semibold">{highlightedGame.equipeB}</h3>
                        </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center text-sm">
                        <div className="flex items-center">
                            <Clock className="mr-2" />
                            {format(parseISO(highlightedGame.data), "d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: pt })}
                        </div>
                        <div className="flex items-center">
                            <MapPin className="mr-2" />
                            {highlightedGame.local}
                        </div>
                        </div>
                    </CardContent>
                </Card>
            )}
            {/* Upcoming Games */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-6xl mt-8 mb-16">
                {mockGames.slice(0, 3).map((game) => (
                <Card 
                    key={game.id} 
                    className={`cursor-pointer transition-all duration-300 ${highlightedGame && highlightedGame.id === game.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleGameClick(game)}
                >
                    <CardHeader>
                    <CardTitle className="text-lg font-semibold flex justify-between items-center">
                        <span>{game.equipeA}</span>
                        <span>vs</span>
                        <span>{game.equipeB}</span>
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="flex justify-between items-center mb-2">
                        <img src={game.imagemA} alt={game.equipeA} className="w-12 h-12 rounded-full" />
                        <img src={game.imagemB} alt={game.equipeB} className="w-12 h-12 rounded-full" />
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {format(parseISO(game.data), "d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: pt })}
                        </div>
                        <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        {game.local}
                        </div>
                    </div>
                    </CardContent>
                </Card>
                ))}
      </div>
    </div>
  )
}