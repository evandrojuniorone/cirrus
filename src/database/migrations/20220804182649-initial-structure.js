'use strict';

module.exports = {
  async up(query, sequelize) {
    await query.createSchema('main');

    await this.companies(query, sequelize);
    await this.companiesBranches(query, sequelize);

    await this.countries(query, sequelize);
    await this.states(query, sequelize);
    await this.cities(query, sequelize);

    await this.modules(query, sequelize);
    await this.pages(query, sequelize);
  },

  async down(query, sequelize) {
    await query.dropTable('pages', { schema: 'main' });
    await query.dropTable('modules', { schema: 'main' });

    await query.dropTable('cities', { schema: 'main' });
    await query.dropTable('states', { schema: 'main' });
    await query.dropTable('countries', { schema: 'main' });

    await query.dropTable('companies_branches', { schema: 'main' });
    await query.dropTable('companies', { schema: 'main' });

    await query.dropSchema('main');
  },

  async companies(query, sequelize) {
    await query.createTable('companies', {
      id: {
        type: sequelize.UUID,
        primaryKey: true,
      },
      owner_name: {
        type: sequelize.TEXT,
      },
      company_name: {
        type: sequelize.TEXT,
      },
      trading_name: {
        type: sequelize.TEXT,
      },
      document: {
        type: sequelize.TEXT,
      },
      state_registration: {
        type: sequelize.TEXT,
      },
      municipal_registration: {
        type: sequelize.TEXT,
      },
      country: {
        type: sequelize.TEXT,
      },
      state: {
        type: sequelize.TEXT,
      },
      city: {
        type: sequelize.TEXT,
      },
      street_name: {
        type: sequelize.TEXT,
      },
      street_number: {
        type: sequelize.TEXT,
      },
      neighborhood: {
        type: sequelize.TEXT,
      },
      postal_code: {
        type: sequelize.TEXT,
      },
      complement: {
        type: sequelize.TEXT,
      },
      reference: {
        type: sequelize.TEXT,
      },
      number_of_branches: {
        type: sequelize.INTEGER,
      },
      created_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
      },
      updated_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
      },
    }, {
      schema: 'main',
    });
  },

  async companiesBranches(query, sequelize) {
    await query.createTable('companies_branches', {
      owner_company_id: {
        type: sequelize.UUID,
        primaryKey: true,
        references: {
          key: 'id',
          model: {
            tableName: 'companies',
            schema: 'main',
          },
        },
      },
      branche_company_id: {
        type: sequelize.UUID,
        primaryKey: true,
        references: {
          key: 'id',
          model: {
            tableName: 'companies',
            schema: 'main',
          },
        },
      },
      created_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
      },
      updated_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
      },
    }, {
      schema: 'main',
    });
  },

  async countries(query, sequelize) {
    await query.createTable('countries', {
      id: {
        type: sequelize.UUID,
        primaryKey: true,
      },
      name: {
        type: sequelize.TEXT,
      },
      initials: {
        type: sequelize.TEXT,
      },
      created_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
      },
      updated_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
      },
    }, {
      schema: 'main',
    });
  },

  async states(query, sequelize) {
    await query.createTable('states', {
      id: {
        type: sequelize.UUID,
        primaryKey: true,
      },
      name: {
        type: sequelize.TEXT,
      },
      initials: {
        type: sequelize.TEXT,
      },
      created_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
      },
      updated_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
      },
      country_id: {
        type: sequelize.UUID,
        references: {
          key: 'id',
          model: {
            tableName: 'countries',
            schema: 'main',
          },
        },
      },
    }, {
      schema: 'main',
    });
  },

  async cities(query, sequelize) {
    await query.createTable('cities', {
      id: {
        type: sequelize.UUID,
        primaryKey: true,
      },
      name: {
        type: sequelize.TEXT,
      },
      created_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
      },
      updated_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
      },
      state_id: {
        type: sequelize.UUID,
        references: {
          key: 'id',
          model: {
            tableName: 'states',
            schema: 'main',
          },
        },
      },
    }, {
      schema: 'main',
    });
  },

  async modules(query, sequelize) {
    await query.createTable('modules', {
      id: {
        type: sequelize.UUID,
        primaryKey: true,
      },
      name: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      display_name: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
        allowNull: false,
      },
    }, {
      schema: 'main',
    });
  },

  async pages(query, sequelize) {
    await query.createTable('pages', {
      id: {
        type: sequelize.UUID,
        primaryKey: true,
      },
      name: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      display_name: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      module_id: {
        type: sequelize.UUID,
        references: {
          key: 'id',
          model: {
            tableName: 'modules',
            schema: 'main',
          },
        },
      },
      created_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
        allowNull: false,
      },
    }, {
      schema: 'main',
    });
  },
};
