import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Page } from '@http/modules/models/page.model';
import { Module } from '@http/modules/models/module.model';
import { IModulesRepository } from '@http/modules/repositories/modules.repository.interface';

@Injectable()
export class ModulesRepository implements IModulesRepository {
  constructor(
    @InjectModel(Module)
    private readonly modules: typeof Module,
  ) { }

  async findMany(): Promise<Module[]> {
    return await this.modules.findAll({
      include: {
        model: Page,
        required: true,
      },
    });
  }
}
