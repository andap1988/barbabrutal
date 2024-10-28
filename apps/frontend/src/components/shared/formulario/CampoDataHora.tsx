import { DateUtils } from "@barbabrutal/core"
import CampoDia from "./CampoDia"
import CampoHorario from "./CampoHorario"

export interface CampoDataHoraProps
    extends Omit<
        React.SelectHTMLAttributes<HTMLInputElement>,
        "value" | "onChange"
    > {
    value: Date | null
    label?: string
    apenasNoFuturo?: boolean
    onChange: (value: Date | null) => void
}

export default function CampoDataHora(props: CampoDataHoraProps) {
    const data = props.value ?? DateUtils.hojeComHoraZerada()
    return (
        <div className="flex flex-col gap-6">
            <CampoDia
                label="Dias Disponíveis"
                value={data}
                onChange={props.onChange}
            />
            <CampoHorario
                label="Horários Disponíveis"
                value={data}
                onChange={props.onChange}
                qtdeHorarios={4}
            />
        </div>
    )
}
