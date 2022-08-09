import { CreateCompanyDto } from '@http/companies/dtos/create-company.dto';

import { Company } from '@http/companies/models/company.model';

export type CompaniesFilter = {
  page?: number;
  size?: number;
};

export interface ICompaniesRepository {
  findOne: (id: string) => Promise<Company>;
  findOneByDocument: (document: string) => Promise<Company>;
  findMany: (filter: CompaniesFilter) => Promise<Company[]>;
  create: (company: CreateCompanyDto) => Promise<Company | null>;
  // update: (id: string, company: UpdateCompanyDto) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  count: (filter: CompaniesFilter) => Promise<number>;
  exists: (id: string) => Promise<boolean>;
};
