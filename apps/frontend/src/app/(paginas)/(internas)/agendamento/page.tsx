"use client"

import FormularioAgendamento from "@/components/agendamento/FormularioAgendamento"
import CabecalhoComTitulo from "@/components/shared/CabecalhoComTitulo"

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <CabecalhoComTitulo
                titulo="Agendamento de serviços"
                descricao="Seja atendido exatamente no hoário marcado."
            />
            <div className="container py-10">
                <FormularioAgendamento />
            </div>
        </div>
    )
}
