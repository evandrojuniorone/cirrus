import { BadRequestException, Injectable } from '@nestjs/common';

import { Company } from '@http/companies/models/company.model';
import { CreateCompanyDto } from '@http/companies/dtos/create-company.dto';
import { CompaniesRepository } from '@http/companies/repositories/companies.repository';
import { CompaniesFilter } from '@http/companies/repositories/companies.repository.interface';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly companiesRepository: CompaniesRepository,
  ) { }

  async findOne(id: string) {
    const companyExists = await this.companiesRepository.exists(id);

    if (!companyExists) {
      throw new BadRequestException('company does not exists');
    }

    return await this.companiesRepository.findOne(id);
  }

  async findMany(filter: CompaniesFilter) {
    return await this.companiesRepository.findMany(filter);
  }

  async create(company: CreateCompanyDto): Promise<Company> {
    return await this.companiesRepository.create(company);
  }

  async delete(document: string): Promise<boolean> {
    const company = await this.companiesRepository.findOneByDocument(document);

    if (!company) {
      throw new BadRequestException(`The company with document [${document}] could not be found`);
    }

    return await this.companiesRepository.delete(company.id);
  }

  async count(filter: CompaniesFilter) {
    return await this.companiesRepository.count(filter);
  }
}
