import { BullModule } from '@nestjs/bull';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module as NestModule } from '@nestjs/common';

import { Company } from '@http/companies/models/company.model';
import { CompaniesService } from '@http/companies/companies.service';
import { CompaniesController } from '@http/companies/companies.controller';
import { CompaniesRepository } from '@http/companies/repositories/companies.repository';

import { Page } from '@http/modules/models/page.model';
import { Module } from '@http/modules/models/module.model';
import { ModulesView } from '@http/modules/views/modules.view';
import { ModulesService } from '@http/modules/modules.service';
import { ModulesController } from '@http/modules/modules.controller';
import { ModulesRepository } from '@http/modules/repositories/modules.repository';

import { CompaniesConsumer } from '@jobs/companies/companies.consumer';
import { CompaniesProducer } from '@jobs/companies/companies.producer';

@NestModule({
  imports: [
    SequelizeModule.forFeature([
      Company,
      Module,
      Page,
    ]),
    BullModule.registerQueue({
      name: 'company-queue',
    }),
  ],
  controllers: [
    CompaniesController,
    ModulesController,
  ],
  providers: [
    //Companies
    CompaniesService,
    CompaniesRepository,

    //Companies Jobs
    CompaniesProducer,
    CompaniesConsumer,

    //Modules
    ModulesService,
    ModulesRepository,
    ModulesView,
  ],
})
export class HttpModule { }
