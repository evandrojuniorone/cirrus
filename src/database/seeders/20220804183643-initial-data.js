'use strict';

const uuid = require('uuid').v4;
const axios = require('axios').default;

module.exports = {
  async up(query, sequelize) {
    await this.populateCountriesStatesAndCities(query, sequelize);
    await this.populateModulesAndPages(query, sequelize);
  },

  async down(query, sequelize) {
    await query.bulkDelete({
      tableName: 'cities',
      schema: 'main',
    }, null, {});

    await query.bulkDelete({
      tableName: 'states',
      schema: 'main',
    }, null, {});

    await query.bulkDelete({
      tableName: 'countries',
      schema: 'main',
    }, null, {});

    await query.bulkDelete({
      tableName: 'pages',
      schema: 'main',
    }, null, {});

    await query.bulkDelete({
      tableName: 'modules',
      schema: 'main',
    }, null, {});
  },

  async populateCountriesStatesAndCities(query, sequelize) {
    const countriesResponse = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/paises`);

    const countries = countriesResponse.data.map(data => ({
      name: data.nome,
      initials: data.id['ISO-ALPHA-2'],
    }));

    for (const country of countries) {
      const countryId = uuid();

      await query.bulkInsert({
        tableName: 'countries',
        schema: 'main',
      }, [
        {
          id: countryId,
          name: country.name,
          initials: country.initials,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ]);

      if (country.initials === 'BR') {
        const statesResponse = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`);

        const states = statesResponse.data.map(data => ({
          name: data.nome,
          initials: data.sigla,
        }));

        for (const state of states) {
          const stateId = uuid();

          await query.bulkInsert({
            tableName: 'states',
            schema: 'main',
          }, [
            {
              id: stateId,
              name: state.name,
              initials: state.initials,
              country_id: countryId,
              created_at: new Date(),
              updated_at: new Date(),
            }
          ]);

          const citiesResponse = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.initials}/municipios`);

          const cities = citiesResponse.data.map(data => ({
            name: data.nome,
          }));

          for (const city of cities) {
            const cityId = uuid();

            await query.bulkInsert({
              tableName: 'cities',
              schema: 'main',
            }, [
              {
                id: cityId,
                name: city.name,
                state_id: stateId,
                created_at: new Date(),
                updated_at: new Date(),
              }
            ]);
          }
        }
      }
    }
  },

  async populateModulesAndPages(query, sequelize) {
    const billingId = uuid();
    const stockId = uuid();
    const billToPayId = uuid();
    const billToReceiveId = uuid();

    await query.bulkInsert({
      tableName: 'modules',
      schema: 'main',
    }, [
      {
        id: billingId,
        name: 'billing',
        display_name: 'Faturamento',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: stockId,
        name: 'stock',
        display_name: 'Estoque',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: billToPayId,
        name: 'bill-to-pay',
        display_name: 'Contas a Pagar',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: billToReceiveId,
        name: 'bill-to-receive',
        display_name: 'Contas a Receber',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await query.bulkInsert({
      tableName: 'pages',
      schema: 'main',
    }, [
      {
        id: uuid(),
        name: 'users',
        display_name: 'Usuários',
        module_id: billingId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'roles',
        display_name: 'Perfis',
        module_id: billingId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'payment-methods',
        display_name: 'Formas de Pagamento',
        module_id: billingId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'invoices',
        display_name: 'Notas Fiscais',
        module_id: billingId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'stocks',
        display_name: 'Estoques',
        module_id: stockId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'exceptions',
        display_name: 'Exceções',
        module_id: stockId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'bills-to-pay',
        display_name: 'Contas a Pagar',
        module_id: billToPayId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'bills-to-pay-installments',
        display_name: 'Parcelas do Contas a Pagar',
        module_id: billToPayId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'bills-to-receive',
        display_name: 'Contas a Receber',
        module_id: billToReceiveId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'bills-to-receive-installments',
        display_name: 'Parcelas do Contas a Receber',
        module_id: billToReceiveId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  }
};
