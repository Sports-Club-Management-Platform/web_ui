"use client"

import { useState } from "react"
import { format, parseISO, isWithinInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isBefore } from "date-fns"
import { AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import NextGame from "./components/NextGame"
import FilterControls from "./components/FilterControls"
import GameCard from "./components/GameCard"


// Dados de exemplo para os jogos (incluindo jogos futuros, URLs de imagens e disponibilidade de bilhetes)
const jogos = [
  { id: 1, data: "2023-01-15", hora: "15:00", equipeA: "Leões FC", equipeB: "Águias SC", local: "Estádio Central", imagemA: "https://picsum.photos/seed/LeoesFC/200", imagemB: "https://picsum.photos/seed/AguiasSC/200", bilhetes: "esgotado" },
  { id: 2, data: "2023-02-20", hora: "20:00", equipeA: "Tigres United", equipeB: "Panteras AC", local: "Arena Norte", imagemA: "https://picsum.photos/seed/TigresUnited/200", imagemB: "https://picsum.photos/seed/PanterasAC/200", bilhetes: "disponivel" },
  { id: 3, data: "2023-04-10", hora: "18:30", equipeA: "Dragões EC", equipeB: "Falcões FC", local: "Estádio do Dragão", imagemA: "https://picsum.photos/seed/DragoesEC/200", imagemB: "https://picsum.photos/seed/FalcoesFC/200", bilhetes: "limitado" },
  { id: 4, data: "2023-05-05", hora: "16:45", equipeA: "Lobos SC", equipeB: "Ursos FC", local: "Toca da Raposa", imagemA: "https://picsum.photos/seed/LobosSC/200", imagemB: "https://picsum.photos/seed/UrsosFC/200", bilhetes: "disponivel" },
  { id: 5, data: "2023-07-22", hora: "19:15", equipeA: "Tubarões AC", equipeB: "Golfinhos EC", local: "Arena Aquática", imagemA: "https://picsum.photos/seed/TubaroesAC/200", imagemB: "https://picsum.photos/seed/GolfinhosEC/200", bilhetes: "esgotado" },
  { id: 6, data: "2023-08-30", hora: "21:00", equipeA: "Corujas FC", equipeB: "Morcegos United", local: "Estádio Noturno", imagemA: "https://picsum.photos/seed/CorujasFC/200", imagemB: "https://picsum.photos/seed/MorcegosUnited/200", bilhetes: "limitado" },
  { id: 7, data: "2023-10-12", hora: "17:30", equipeA: "Raposas SC", equipeB: "Guepardos AC", local: "Campo Veloz", imagemA: "https://picsum.photos/seed/RaposasSC/200", imagemB: "https://picsum.photos/seed/GuepardosAC/200", bilhetes: "disponivel" },
  { id: 8, data: "2023-11-25", hora: "14:00", equipeA: "Elefantes FC", equipeB: "Rinocerontes EC", local: "Estádio Savana", imagemA: "https://picsum.photos/seed/ElefantesFC/200", imagemB: "https://picsum.photos/seed/RinocerontesEC/200", bilhetes: "esgotado" },
  { id: 9, data: "2023-12-05", hora: "20:30", equipeA: "Leões FC", equipeB: "Tigres United", local: "Estádio Central", imagemA: "https://picsum.photos/seed/LeoesFC/200", imagemB: "https://picsum.photos/seed/TigresUnited/200", bilhetes: "disponivel" },
  { id: 10, data: "2024-01-18", hora: "19:00", equipeA: "Águias SC", equipeB: "Panteras AC", local: "Ninho da Águia", imagemA: "https://picsum.photos/seed/AguiasSC/200", imagemB: "https://picsum.photos/seed/PanterasAC/200", bilhetes: "limitado" },
  { id: 11, data: "2024-02-22", hora: "16:00", equipeA: "Dragões EC", equipeB: "Lobos SC", local: "Estádio do Dragão", imagemA: "https://picsum.photos/seed/DragoesEC/200", imagemB: "https://picsum.photos/seed/LobosSC/200", bilhetes: "disponivel" },
  { id: 12, data: "2024-11-10", hora: "18:45", equipeA: "Falcões FC", equipeB: "Ursos FC", local: "Arena das Aves", imagemA: "https://picsum.photos/seed/FalcoesFC/200", imagemB: "https://picsum.photos/seed/UrsosFC/200", bilhetes: "disponivel" },
  { id: 13, data: "2024-12-15", hora: "21:30", equipeA: "Tubarões AC", equipeB: "Golfinhos EC", local: "Arena Aquática", imagemA: "https://picsum.photos/seed/TubaroesAC/200", imagemB: "https://picsum.photos/seed/GolfinhosEC/200", bilhetes: "esgotado" },
  { id: 14, data: "2025-01-20", hora: "20:15", equipeA: "Corujas FC", equipeB: "Morcegos United", local: "Estádio Noturno", imagemA: "https://picsum.photos/seed/CorujasFC/200", imagemB: "https://picsum.photos/seed/MorcegosUnited/200", bilhetes: "limitado" },
  { id: 15, data: "2025-02-25", hora: "17:00", equipeA: "Raposas SC", equipeB: "Guepardos AC", local: "Campo Veloz", imagemA: "https://picsum.photos/seed/RaposasSC/200", imagemB: "https://picsum.photos/seed/GuepardosAC/200", bilhetes: "disponivel" },
  { id: 16, data: "2025-03-30", hora: "15:30", equipeA: "Elefantes FC", equipeB: "Rinocerontes EC", local: "Estádio Savana", imagemA: "https://picsum.photos/seed/ElefantesFC/200", imagemB: "https://picsum.photos/seed/RinocerontesEC/200", bilhetes: "esgotado" }
]

export default function MatchesPage() {
  const [filtro, setFiltro] = useState("futuros")
  const [pesquisa, setPesquisa] = useState("")
  const [dataFiltro, setDataFiltro] = useState(null)
  const { theme } = useTheme()

  const dataAtual = new Date()

  const proximoJogo = jogos
    .filter(jogo => parseISO(jogo.data) > dataAtual)
    .sort((a, b) => parseISO(a.data).getTime() - parseISO(b.data).getTime())[0]

  const filtrarPorTrimestre = (jogo) => {
    const mes = parseInt(jogo.data.split("-")[1])
    if (filtro === "todos" || filtro === "futuros") return true
    if (filtro === "1") return mes >= 1 && mes <= 3
    if (filtro === "2") return mes >= 4 && mes <= 6
    if (filtro === "3") return mes >= 7 && mes <= 9
    if (filtro === "4") return mes >= 10 && mes <= 12
  }

  const filtrarPorPesquisa = (jogo) => {
    const termoPesquisa = pesquisa.toLowerCase()
    return (
      jogo.data.includes(termoPesquisa) ||
      jogo.equipeA.toLowerCase().includes(termoPesquisa) ||
      jogo.equipeB.toLowerCase().includes(termoPesquisa)
    )
  }

  const filtrarPorData = (jogo) => {
    if (!dataFiltro) return true
    const jogoData = parseISO(jogo.data)
    if (filtro === "semana") {
      const inicio = startOfWeek(dataFiltro)
      const fim = endOfWeek(dataFiltro)
      return isWithinInterval(jogoData, { start: inicio, end: fim })
    } else if (filtro === "mes") {
      const inicio = startOfMonth(dataFiltro)
      const fim = endOfMonth(dataFiltro)
      return isWithinInterval(jogoData, { start: inicio, end: fim })
    }
    return true
  }

  const filtrarJogosFuturos = (jogo) => {
    return filtro === "futuros" ? parseISO(jogo.data) > dataAtual : true
  }

  const jogosFiltrados = jogos
    .filter(filtrarPorTrimestre)
    .filter(filtrarPorPesquisa)
    .filter(filtrarPorData)
    .filter(filtrarJogosFuturos)

  return (
    <div className="container pt-36 mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">1ª Divisão de Hoquei em Patins</h1>
        <p className="text-xl text-muted-foreground">Acompanhe todos os jogos e garanta seus ingressos!</p>
      </div>
      {proximoJogo && <NextGame jogo={proximoJogo} theme={theme} />}
      <FilterControls
        filtro={filtro}
        setFiltro={setFiltro}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        dataFiltro={dataFiltro}
        setDataFiltro={setDataFiltro}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {jogosFiltrados.map((jogo, index) => (
            <GameCard key={jogo.id} jogo={jogo} index={index} dataAtual={dataAtual} />
          ))}
        </AnimatePresence>
      </div>
      {jogosFiltrados.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">Nenhum jogo encontrado para os filtros selecionados.</p>
      )}
    </div>
  )
}