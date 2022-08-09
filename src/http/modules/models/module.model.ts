import { Column, HasMany, Model, Table } from 'sequelize-typescript';

import { Page } from '@http/modules/models/page.model';

@Table({ schema: 'main', tableName: 'modules' })
export class Module extends Model {
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

  @HasMany(() => Page)
  pages: Page[];
}
