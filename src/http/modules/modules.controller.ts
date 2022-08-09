import { Controller, Get } from '@nestjs/common';

import { ModulesView } from '@http/modules/views/modules.view';
import { ModulesService } from '@http/modules/modules.service';

@Controller('modules')
export class ModulesController {
  constructor(
    private readonly modulesView: ModulesView,
    private readonly modulesService: ModulesService,
  ) { }

  @Get()
  async findMany() {
    return this.modulesView.simpleMany(await this.modulesService.findMany());
  }
}
