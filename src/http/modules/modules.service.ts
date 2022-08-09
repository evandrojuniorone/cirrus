import { Injectable } from '@nestjs/common';

import { Module } from '@http/modules/models/module.model';
import { ModulesRepository } from '@http/modules/repositories/modules.repository';

@Injectable()
export class ModulesService {
  constructor(
    private readonly modulesRepository: ModulesRepository,
  ) { }

  async findMany(): Promise<Module[]> {
    return await this.modulesRepository.findMany();
  }
}
