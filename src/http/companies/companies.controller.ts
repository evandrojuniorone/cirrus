import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CompaniesService } from '@http/companies/companies.service';
import { CreateCompanyDto } from '@http/companies/dtos/create-company.dto';

import { CompaniesProducer } from '@jobs/companies/companies.producer';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly companiesProducer: CompaniesProducer,
  ) { }

  @Get(':id')
  async findOneCompany(@Param('id') id: string) {
    return await this.companiesService.findOne(id);
  }

  @Get()
  async findManyCompanies() {
    return {
      companies: await this.companiesService.findMany({}),
      count: await this.companiesService.count({}),
    };
  }

  @Post()
  async createCompany(@Body() company: CreateCompanyDto) {
    const createdCompany = await this.companiesService.create(company);

    if (!createdCompany) {
      throw new BadRequestException('could not create company.');
    }

    this.companiesProducer.create(createdCompany);

    return createdCompany;
  }

  @Delete(':document')
  async deleteCompany(@Param('document') document: string) {
    const deleted = await this.companiesService.delete(document);

    if (!deleted) {
      throw new BadRequestException(`The company with document [${document}] could not be delete`);
    }

    this.companiesProducer.delete(document);
  }
}
