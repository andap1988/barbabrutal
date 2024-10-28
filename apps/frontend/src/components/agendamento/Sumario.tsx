"use client"

import useAgendamento from "@/data/hooks/useAgendamento"
import { MoedaUtils, Servico } from "@barbabrutal/core"
import { IconCalendar } from "@tabler/icons-react"

export default function Sumario() {
    const {
        profissional,
        servicos,
        dataValida,
        duracaoTotal,
        precoTotal,
        podeAgendar,
        agendar,
    } = useAgendamento()

    function renderizarTitulo() {
        return (
            <div className="flex items-center gap-2 p-4 border-b border-zinc-700">
                <div className="flex justify-center items-center bg-zinc-700 h-9 w-9 rounded-full">
                    <IconCalendar size={20} stroke={1} />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-zinc-300">
                        Sumário do Agendamento
                    </span>
                    <span className="text-xs text-zinc-500 leading-3">
                        Será um prazer atendê-lo!
                    </span>
                </div>
            </div>
        )
    }

    function renderizarProfissional() {
        return (
            <div className="flex flex-col gap-2">
                <span className="text-xs uppercase text-zinc-300">
                    Profissional
                </span>
                <span className="text-sm text-white">
                    {profissional?.nome ?? "Não selecionado"}
                </span>
            </div>
        )
    }

    function renderizarServicos() {
        return (
            <div className="flex flex-col gap-2">
                <span className="text-xs uppercase text-zinc-300">
                    Serviços
                </span>
                <div className="flex gap-2 flex-wrap text-sm text-white">
                    {servicos.length === 0 ? "Nenhum serviço selecionado" : ""}
                    {servicos.map((s, i) => renderizarServico(s, i + 1))}
                </div>
            </div>
        )
    }

    function renderizarServico(servico: Servico, i: number) {
        return (
            <div
                key={servico.id}
                className="flex items-center bg-zinc-700 rounded-md"
            >
                <span className="bg-black/25 px-3 py-1.5">{i}</span>
                <span className="font-light px-3">{servico.nome}</span>
            </div>
        )
    }

    function renderizarDuracaoTotal() {
        return (
            <div className="flex flex-col gap-3">
                <span className="text-xs uppercase text-zinc-300">Duração</span>
                <span className="font-light">{duracaoTotal()}</span>
            </div>
        )
    }

    function renderizarSumarioData() {
        return (
            <div className="flex flex-col gap-3">
                <span className="text-xs uppercase text-zinc-300">Horário</span>
                <span className="font-light">
                    {!dataValida ? "Não selecionado" : ""}
                    {dataValida?.toLocaleDateString("pt-BR", {
                        dateStyle: "long",
                    })}
                    {dataValida && " às "}
                    {dataValida?.toLocaleTimeString("pt-BR").substring(0, 5)}
                </span>
            </div>
        )
    }

    function renderizarValorTotal() {
        return (
            <div className="flex justify-between items-center gap-3 border-y border-zinc-700 p-5">
                <span className="text-xs uppercase text-zinc-300">
                    Valor Total
                </span>
                <span className="font-bold">
                    {MoedaUtils.formatar(precoTotal())}
                </span>
            </div>
        )
    }

    return (
        <div className="flex flex-col self-start bg-zinc-900 w-96 rounded-lg">
            {renderizarTitulo()}
            <div className="flex flex-col p-5 gap-6">
                {renderizarProfissional()}
                {renderizarServicos()}
                {renderizarDuracaoTotal()}
                {renderizarSumarioData()}
            </div>
            {renderizarValorTotal()}
            <div className="p-5">
                <button
                    onClick={agendar}
                    disabled={!podeAgendar()}
                    className={`
                    button w-full bg-yellow-500 text-black
                    ${!podeAgendar() ? "cursor-not-allowed opacity-50" : ""}
                `}
                >
                    Finalizar Agendamento
                </button>
            </div>
        </div>
    )
}
