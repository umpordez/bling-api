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

const product = {
    nome: `Test #${new Date().getTime()}`,
    codigo: `code_${new Date().getTime()}`,
    tipo: 'P',
    formato: 'S',
    unidade: 'UN'
}


describe('Bling! API Pedidos-Vendas Client', () => {
    const { API_TOKEN } = process.env;
    const client = new BlingApi(API_TOKEN);

    const createdPedidos = [];
    const createdProdutos = [];
    const createdContatos = [];

    after(async () => { });

    before(async () => {
        const produto = await client.produtos.create(product);

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

    it.only('create', async () => {
        const contato = createdContatos[0];
        const produto = createdProdutos[0];

        const body = {
            "contato": {
                "id": contato.id
            },
            "data": formatDate(new Date(), 'yyyy-MM-dd'),
            numero: new Date().getTime(),

            "itens": [
                {
                    "produto": {
                        "codigo": produto.codigo,
                        "unidade": 'UN',
                        "descricao": produto.nome,
                        "id": produto.id,
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

    it('findAll', async () => {
        for await (const orders of client.pedidosVendas.getAll({ numero: 19 })) {
            console.log(orders);
        }
    });

    it('update', async () => {
        const contato = createdContatos[0];
        const produto = createdProdutos[0];

        const res = await client.pedidosVendas.update(
            createdPedidos[0].id, {
                "contato": {
                    "id": contato.id
                },
                "data": formatDate(new Date(), 'yyyy-MM-dd'),
                numero: 'foo_5',

                "itens": [
                    {
                        "produto": {
                            "codigo": product.codigo,
                            "descricao": product.nome,
                            "id": produto.id,
                            "pesoBruto": 0,
                            "precoLista": 0
                        },
                        "quantidade": 20,
                        "valor": 10
                    }
                ],
                "transporte": {
                    "fretePorConta": 0,
                    "frete": 20,
                    "quantidadeVolumes": 1,
                    "pesoBruto": 0.5,
                    "prazoEntrega": 10,
                    "contato": {
                        "nome": "Transportador SEDEX"
                    },
                    "etiqueta": {
                        "nome": "Transportador",
                        "endereco": "Olavo Bilac",
                        "numero": "914",
                        "complemento": "Sala 101",
                        "municipio": "Bento Gonçalves",
                        "uf": "RS",
                        "cep": "95702-000",
                        "bairro": "Imigrante",
                        "nomePais": "BRASIL"
                    },
                }
            }
        );

        console.log(res);
        assert(res);

        const newOrder = await client.pedidosVendas.get(createdPedidos[0].id);
        console.log(newOrder);
    });

    it('update situacao', async () => {
        const contato = createdContatos[0];
        const produto = createdProdutos[0];
        const pedido =  createdPedidos[0];

        // situacaoId 9 = Atendido
        const res = await client.pedidosVendas.updateSituacao(pedido.id, 9)
        console.log(res);
    });

});
