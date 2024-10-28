"use state"

import CampoProfissional from "../profissional/CampoProfissional"
import CampoServicos from "../servico/CampoServicos"
import CampoDataHora from "../shared/formulario/CampoDataHora"
import useAgendamento from "@/data/hooks/useAgendamento"
import Passos from "../shared/Passos"
import Sumario from "./Sumario"

export default function FormularioAgendamento() {
    const {
        profissional,
        servicos,
        data,
        selecionarData,
        selecionarProfissional,
        selecionarServicos,
        agendar,
        podeAgendar,
    } = useAgendamento()

    return (
        <div className="flex gap-10">
            <Passos
                labels={[
                    "Selecione o Profissional",
                    "Selecione o Serviço",
                    "Escolha o Horário",
                ]}
                permiteProximoPasso={[
                    !!profissional,
                    servicos.length > 0,
                    podeAgendar(),
                ]}
                acao={agendar}
                labelAcao="Agendar"
            >
                <CampoProfissional
                    label="Profissionais disponíveis"
                    value={profissional}
                    onChange={selecionarProfissional}
                    className="input"
                />
                <CampoServicos
                    label="Serviços disponíveis"
                    value={servicos}
                    onChange={selecionarServicos}
                    className="input"
                />
                <CampoDataHora
                    label="Data e Hora"
                    value={data}
                    onChange={selecionarData}
                    className="input"
                    apenasNoFuturo
                />
            </Passos>
            <Sumario />
        </div>
    )
}
