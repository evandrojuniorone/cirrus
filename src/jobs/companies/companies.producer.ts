import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

import { Company } from '@http/companies/models/company.model';

@Injectable()
export class CompaniesProducer {
  constructor(
    @InjectQueue('company-queue')
    private readonly companyQueue: Queue
  ) { }

  async create(company: Company) {
    await this.companyQueue.add('create', company);
  }

  async delete(document: string) {
    await this.companyQueue.add('delete', document);
  }
}
