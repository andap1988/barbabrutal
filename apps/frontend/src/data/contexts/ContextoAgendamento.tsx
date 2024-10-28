"use client"

import { createContext, useState } from "react"
import UseAPI from "../hooks/useAPI"
import useSessao from "../hooks/useSessao"
import {
    AgendaUtils,
    DateUtils,
    Profissional,
    Servico,
} from "@barbabrutal/core"
import { useRouter } from "next/navigation"

export interface ContextoAgendamentoProps {
    profissional: Profissional | null
    servicos: Servico[]
    data: Date | null
    dataValida: Date | null
    agendar: () => Promise<void>
    selecionarServicos: (servicos: Servico[]) => void
    selecionarProfissional: (profissional: Profissional | null) => void
    selecionarData: (data: Date | null) => void
    podeAgendar: () => boolean
    duracaoTotal: () => string
    precoTotal: () => number
}

const ContextoAgendamento = createContext<ContextoAgendamentoProps>({} as any)

export function ProvedorAgendamento(props: any) {
    const { httpPost } = UseAPI()
    const { usuario } = useSessao()
    const router = useRouter()

    const [profissional, setProfissional] = useState<Profissional | null>(null)
    const [servicos, setServicos] = useState<Servico[]>([])
    const [data, setData] = useState<Date | null>(null)

    function podeAgendar(): boolean {
        if (!profissional) return false
        if (servicos.length === 0) return false
        if (!data) return false
        return data.getHours() >= 8 && data.getHours() <= 20
    }

    function duracaoTotal() {
        return AgendaUtils.duracaoTotal(servicos)
    }

    async function agendar() {
        await httpPost("/agendamentos", {
            data,
            usuario,
            profissional,
            servicos,
        })

        router.push("/agendamento/sucesso")
        limpar()
    }

    function limpar() {
        setProfissional(null)
        setServicos([])
        setData(DateUtils.hojeComHoraZerada())
    }

    function precoTotal() {
        return servicos.reduce((acc, servico) => acc + servico.preco, 0)
    }

    return (
        <ContextoAgendamento.Provider
            value={{
                profissional,
                servicos,
                data,
                get dataValida() {
                    if (!data) return null
                    if (data.getHours() < 8 || data.getHours() > 20) return null
                    return data
                },
                selecionarProfissional: setProfissional,
                selecionarServicos: setServicos,
                selecionarData: setData,
                agendar,
                podeAgendar,
                duracaoTotal,
                precoTotal,
            }}
        >
            {props.children}
        </ContextoAgendamento.Provider>
    )
}

export default ContextoAgendamento
