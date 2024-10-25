import Profissional from "../../profissional/model/Profissional"
import Servico from "../../servico/model/Servico"
import Usuario from "../../usuario/model/Usuario"

export default interface Agendamento {
    id: number
    data: Date
    usuario: Usuario
    profissional: Partial<Profissional>
    servicos: Partial<Servico>[]
}
