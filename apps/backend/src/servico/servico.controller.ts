import { BuscarServicos } from '@barbabrutal/core';
import { Controller, Get } from '@nestjs/common';
import { ServicoPrisma } from './servico.prisma';

@Controller('servicos')
export class ServicoController {
  constructor(private readonly repo: ServicoPrisma) {}

  @Get()
  obterProfissionais() {
    const casoDeUso = new BuscarServicos(this.repo);
    return casoDeUso.executar();
  }
}
