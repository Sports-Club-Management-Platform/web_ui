import { format, parseISO } from "date-fns"
import { pt } from "date-fns/locale"
import { MapPin, Calendar, Clock } from "lucide-react"
import { GameResponse, PavilionResponse, ClubResponse } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { ClubService } from "@/services/Client/ClubService"
import { Skeleton } from "@/components/ui/skeleton"
import { FC } from "react"

interface GameHeaderProps {
  game: GameResponse
  pavilion: PavilionResponse
}

const GameHeader: FC<Readonly<GameHeaderProps>> = ({ game, pavilion }) => {
  const { data: homeClub, isLoading: isLoadingHomeClub } = useQuery<ClubResponse>({
    queryKey: ["club", game.club_home_id],
    queryFn: () => ClubService.getClub(game.club_home_id.toString()).then((response : {data: ClubResponse}) => response.data),
  })

  const { data: visitorClub, isLoading: isLoadingVisitorClub } = useQuery<ClubResponse>({
    queryKey: ["club", game.club_visitor_id],
    queryFn: () => ClubService.getClub(game.club_visitor_id.toString()).then((response : {data: ClubResponse}) => response.data),
  })

  if (isLoadingHomeClub || isLoadingVisitorClub) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center items-center space-x-8 mb-8">
        <div className="text-center">
          <img src={homeClub?.image} alt={homeClub?.name} className="w-32 h-32 mx-auto rounded-full border-4 border-white" />
          <h2 className="mt-2 text-2xl font-semibold">{homeClub?.name}</h2>
        </div>
        <div className="text-6xl font-bold">VS</div>
        <div className="text-center">
          <img src={visitorClub?.image} alt={visitorClub?.name} className="w-32 h-32 mx-auto rounded-full border-4 border-white" />
          <h2 className="mt-2 text-2xl font-semibold">{visitorClub?.name}</h2>
        </div>
      </div>
      <div className="flex justify-center space-x-8 text-lg mb-8">
        <div className="flex items-center">
          <Calendar className="mr-2" />
          {format(parseISO(game.date_time), "d 'de' MMMM 'de' yyyy", { locale: pt })}
        </div>
        <div className="flex items-center">
          <Clock className="mr-2" />
          {format(parseISO(game.date_time), "HH:mm")}
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2" />
          {pavilion.name}
        </div>
      </div>
    </>
  )
}

export default GameHeader