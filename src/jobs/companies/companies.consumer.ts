import { Job } from 'bull';
import { Sequelize } from 'sequelize-typescript';
import { Process, Processor } from '@nestjs/bull';
import { DataTypes, QueryInterface, Transaction } from 'sequelize';

import { Company } from '@http/companies/models/company.model';

@Processor('company-queue')
export class CompaniesConsumer {
  constructor(
    private readonly sequelize: Sequelize,
  ) { }

  @Process('create')
  async create(job: Job<Company>) {
    try {
      const schema = `C${job.data.document}`;

      const query = this.sequelize.getQueryInterface();

      await this.sequelize.transaction(async (transaction) => {
        await query.createSchema(process.env.DB_DIALECT === 'postgres' ? `"${schema}"` : schema, {
          transaction,
        });

        await this.neighborhoods(query, schema, transaction);
        await this.addresses(query, schema, transaction);

        await this.roles(query, schema, transaction);
        await this.permissions(query, schema, transaction);

        await this.users(query, schema, transaction);
        await this.usersRefreshToken(query, schema, transaction);
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  @Process('delete')
  async delete(job: Job<string>) {
    try {
      const schema = `C${job.data}`;

      const query = this.sequelize.getQueryInterface();

      await this.sequelize.transaction(async (transaction) => {
        await query.dropTable({ tableName: 'users_refresh_token', schema }, { transaction });
        await query.dropTable({ tableName: 'users', schema }, { transaction });

        await query.dropTable({ tableName: 'permissions', schema }, { transaction });
        await query.dropTable({ tableName: 'roles', schema }, { transaction });

        await query.dropTable({ tableName: 'addresses', schema }, { transaction });
        await query.dropTable({ tableName: 'neighborhoods', schema }, { transaction });

        await query.dropSchema(process.env.DB_DIALECT === 'postgres' ? `"${schema}"` : schema, { transaction });
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  async neighborhoods(query: QueryInterface, schema: string, transaction: Transaction) {
    await query.createTable({
      tableName: 'neighborhoods',
      schema,
    }, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      city_id: {
        type: DataTypes.UUID,
        references: {
          key: 'id',
          model: {
            tableName: 'cities',
            schema: 'main',
          },
        },
      },
    }, {
      transaction,
    });
  }

  async addresses(query: QueryInterface, schema: string, transaction: Transaction) {
    await query.createTable({
      tableName: 'addresses',
      schema,
    }, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      street_name: {
        type: DataTypes.TEXT,
      },
      street_number: {
        type: DataTypes.TEXT,
      },
      complement: {
        type: DataTypes.TEXT,
      },
      reference: {
        type: DataTypes.TEXT,
      },
      postal_code: {
        type: DataTypes.TEXT,
      },
      latitude: {
        type: DataTypes.TEXT,
      },
      longitude: {
        type: DataTypes.TEXT,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      neighborhood_id: {
        type: DataTypes.UUID,
        references: {
          key: 'id',
          model: {
            tableName: 'neighborhoods',
            schema,
          },
        },
      },
    }, {
      transaction,
    });
  }

  async roles(query: QueryInterface, schema: string, transaction: Transaction) {
    await query.createTable({
      tableName: 'roles',
      schema,
    }, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    }, {
      transaction,
    });
  }

  async permissions(query: QueryInterface, schema: string, transaction: Transaction) {
    await query.createTable({
      tableName: 'permissions',
      schema,
    }, {
      role_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          key: 'id',
          model: {
            tableName: 'roles',
            schema,
          },
        },
      },
      module_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          key: 'id',
          model: {
            tableName: 'modules',
            schema: 'main',
          },
        },
      },
      page_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          key: 'id',
          model: {
            tableName: 'pages',
            schema: 'main',
          },
        },
      },
    }, {
      transaction,
    });
  }

  async users(query: QueryInterface, schema: string, transaction: Transaction) {
    await query.createTable({
      tableName: 'users',
      schema,
    }, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      seller_code: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      manager: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.UUID,
        references: {
          key: 'id',
          model: {
            tableName: 'roles',
            schema,
          },
        },
      },
    }, {
      transaction,
    });
  }

  async usersRefreshToken(query: QueryInterface, schema: string, transaction: Transaction) {
    await query.createTable({
      tableName: 'users_refresh_token',
      schema,
    }, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      expired_in: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          key: 'id',
          model: {
            tableName: 'users',
            schema,
          },
        },
      },
    }, {
      transaction,
    });
  }
}
