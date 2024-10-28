"use client"

import ItemServico from "./ItemServico"
import TituloSecao from "../shared/TituloSecao"
import useServicos from "@/data/hooks/useServicos"

export default function NossosServicos() {
    const { servicos } = useServicos()

    return (
        <div className="flex flex-col gap-y-16">
            <TituloSecao
                tag="Serviços"
                principal="Do Clássico ao Rock"
                secundario="Cabelo afiado, barba de lenhador e mãos de motoqueiro, tudo ao som de rock pesado!"
            />
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
                {servicos.map((servico) => (
                    <ItemServico key={servico.id} servico={servico} />
                ))}
            </div>
        </div>
    )
}
