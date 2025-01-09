"use client"

import GenericFilterControls from '@/components/generic-filter-controls'
import { AddGameModalContent } from './AddGameModalContent'

interface DateRange {
  from: Date;
  to?: Date;
}

interface GameFilterControlsProps {
  readonly filtro: string;
  readonly setFiltro: (filtro: string) => void;
  readonly pesquisa: string;
  readonly setPesquisa: (pesquisa: string) => void;
  readonly dataFiltro: DateRange | null;
  readonly setDataFiltro: (data: DateRange | null) => void;
}

export default function GameFilterControls(props: GameFilterControlsProps) {
  return (
    <GenericFilterControls
      {...props}
      addButtonText="Adicionar Jogo"
      addModalContent={<AddGameModalContent />}
    />
  )
}