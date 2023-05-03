require('../test-helper');

const assert = require('assert');
const BlingBaseClient = require('../../core/base-client');

describe('Bling BaseClient', () => {
    const { API_TOKEN } = process.env;

    it('initialize client', () => {
        const client = new BlingBaseClient(API_TOKEN);

        assert(client);
    });

    it('create a venda()', async () => {
        const client = new BlingBaseClient(API_TOKEN);
        const res = await client.doRequest(
            'POST',
            'vendas',
            {
                numero: 127,
                total: 100,
                totalProdutos: 90,
                data: '2023-04-30',
                contato: {
                    id: 16119277430
                },
                itens: [
                    {
                        id: 16045231433,
                        produto: {
                            id: 16045231433,
                            codigo: 'Test',
                        },
                        quantidade: 2,
                        valor: 90,
                        unidade: 'un'
                    }
                ]
            }
        );

    });
});
