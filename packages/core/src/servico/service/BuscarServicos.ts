import CasoDeUso from "../../shared/CasoDeUso"
import Servico from "../model/Servico"
import RepositorioServico from "../provider/RepositorioServico"

// DDD: Application Service = Caso de uso = Fluxo da aplicação
export default class BuscarServicos implements CasoDeUso<void, Servico[]> {
    constructor(private readonly repo: RepositorioServico) {}

    async executar(): Promise<Servico[]> {
        return await this.repo.buscarTodos()
    }
}
