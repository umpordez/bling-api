const { format:formatDate } = require('date-fns');
const assert = require('assert');
const { fakerPT_BR: faker } = require('@faker-js/faker');

require('../test-helper');
const BlingApi = require('../../bling-api');

const customer = {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    cellphone: faker.phone.number().replace(/\D/g, '')
};

describe('Bling! API Pedidos-Vendas Client', () => {
    const { API_TOKEN } = process.env;
    const client = new BlingApi(API_TOKEN);

    const createdPedidos = [];
    const createdProdutos = [];
    const createdContatos = [];

    after(async () => { });

    before(async () => {
        const produto = await client.produtos.create({
            nome: `Test #${new Date().getTime()}`,
            codigo: `code_${new Date().getTime()}`,
            tipo: 'P',
            formato: 'S'
        });

        const contato = await client.contatos.create({
            nome: `Test #${new Date().getTime()}`,
            tipo: 'F'
        });

        console.log('produto', produto);
        console.log('contato', contato);
        createdProdutos.push(produto);
        createdContatos.push(contato);
    });

    it('initialize client', () => {
        assert(client);
    });

    it('create', async () => {
        const contato = createdContatos[0];

        const body = {
            "contato": {
                "id": contato.id
            },
            "data": formatDate(new Date(), 'yyyy-MM-dd'),

            "itens": [
                {
                    "produto": {
                        "codigo": "code_1698161902303",
                        "descricao": "Test #1698161902303",
                        "id": 16153298832,
                        "pesoBruto": 0,
                        "precoLista": 0
                    },
                    "quantidade": 10,
                    "valor": 10
                }
            ],

            "transporte": {
                "contato": {
                    "id": 0,
                    "nome": ""
                },
                "etiqueta": null,
                "frete": 0,
                "fretePorConta": "R",
                "pesoBruto": 0,
                "prazoEntrega": "0",
                "qtdVolumes": "0",
                "volumes": []
            },
        }

        const res = await client.pedidosVendas.create(body);

        console.log('pedido', res);
        createdPedidos.push(res);
    });

    it('find', async () => {
        const res = await client.pedidosVendas.get(createdPedidos[0].id);
        console.log(res);
        assert(res);
    });

    it('update', async () => {
        const contato = createdContatos[0];

        const res = await client.pedidosVendas.update(
            createdPedidos[0].id, {
                "contato": {
                    "id": contato.id
                },
                "data": formatDate(new Date(), 'yyyy-MM-dd'),

                "itens": [
                    {
                        "produto": {
                            "codigo": "code_1698161902303",
                            "descricao": "Test #1698161902303",
                            "id": 16153298832,
                            "pesoBruto": 0,
                            "precoLista": 0
                        },
                        "quantidade": 20,
                        "valor": 10
                    }
                ],
            }
        );

        console.log(res);
        assert(res);


        const newOrder = await client.pedidosVendas.get(createdPedidos[0].id);
        console.log(newOrder);
    });
});
