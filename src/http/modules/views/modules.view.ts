import { Injectable } from '@nestjs/common';

import { Module } from '@http/modules/models/module.model';

@Injectable()
export class ModulesView {
  simple(module: Module) {
    return {
      id: module.id,
      name: module.name,
      displayName: module.displayName,
      pages: module.pages.map(page => ({
        id: page.id,
        name: page.name,
        displayName: page.displayName,
      })),
    }
  }

  simpleMany(modules: Module[]) {
    return modules.map(module => this.simple(module));
  }
}
