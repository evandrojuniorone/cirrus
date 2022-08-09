import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateCompanyDto } from '@http/companies/dtos/create-company.dto';

import { Company } from '@http/companies/models/company.model';

import { CompaniesFilter, ICompaniesRepository } from '@http/companies/repositories/companies.repository.interface';

@Injectable()
export class CompaniesRepository implements ICompaniesRepository {
  constructor(
    @InjectModel(Company)
    private readonly companies: typeof Company,
  ) {}

  async findOne(id: string): Promise<Company> {
    return await this.companies.findByPk(id);
  }
  
  async findOneByDocument(document: string): Promise<Company> {
    return await this.companies.findOne({
      where: {
        document,
      },
    });
  }

  async findMany(filter: CompaniesFilter): Promise<Company[]> {
    return await this.companies.findAll();
  }

  async create(company: CreateCompanyDto): Promise<Company> {
    return await this.companies.create({
      id: uuid(),
      ownerName: company.ownerName,
      companyName: company.companyName,
      tradingName: company.tradingName,
      document: company.document,
      stateRegistration: company.stateRegistration,
      municipalRegistration: company.municipalRegistration,
      numberOfBranches: company.numberOfBranches,
      country: company.country,
      state: company.state,
      city: company.city,
      streetName: company.streetName,
      streetNumber: company.streetNumber,
      neighborhood: company.neighborhood,
      postalCode: company.postalCode,
      complement: company.complement,
      reference: company.reference,
    });
  }

  async delete(id: string): Promise<boolean> {
    const affectedRows = await this.companies.destroy({
      where: {
        id,
      }
    });

    return affectedRows > 0;
  }

  async count(filter: CompaniesFilter): Promise<number> {
    return await this.companies.count();
  }

  async exists(id: string): Promise<boolean> {
    return await this.companies.count({
      where: {
        id
      },
    }) > 0;
  }
}
