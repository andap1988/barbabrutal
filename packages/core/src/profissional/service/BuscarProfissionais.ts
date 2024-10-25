import CasoDeUso from "../../shared/CasoDeUso"
import Profissional from "../model/Profissional"
import RepositorioProfissional from "../provider/RepositorioProfissional"

// DDD: Application Service = Caso de uso = Fluxo da aplicação
export default class BuscarProfissionais
    implements CasoDeUso<void, Profissional[]>
{
    constructor(private readonly repo: RepositorioProfissional) {}

    async executar(): Promise<Profissional[]> {
        return await this.repo.buscarTodos()
    }
}
