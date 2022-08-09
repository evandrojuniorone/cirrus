import { Module } from '@http/modules/models/module.model';

export interface IModulesRepository {
  findMany: () => Promise<Module[]>;
}
