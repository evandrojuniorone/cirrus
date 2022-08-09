import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Module } from '@http/modules/models/module.model';

@Table({ schema: 'main', tableName: 'pages' })
export class Page extends Model {
  @Column({ field: 'id', primaryKey: true })
  id: string;

  @Column({ field: 'name' })
  name: string;

  @Column({ field: 'display_name' })
  displayName: string;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @ForeignKey(() => Module)
  @Column({ field: 'module_id' })
  moduleId: string;
}
