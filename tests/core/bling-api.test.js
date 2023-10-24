require('../test-helper');

const { format:formatDate } = require('date-fns');
const assert = require('assert');
const BlingApi = require('../../bling-api');

describe('BlingApi', () => {
    const { API_TOKEN } = process.env;
    const createdProdutos = [];

    after(async () => {
        const client = new BlingApi(API_TOKEN);

        for (const prod of createdProdutos) {
            await client.produtos.situacoes(prod.id, 'E');
            await client.produtos.delete(prod.id);
        }
    });

    it('initialize client', () => {
        const client = new BlingApi(API_TOKEN);

        assert(client);
        assert(client.apiToken);
    });

    it('create product', async () => {
        const client = new BlingApi(API_TOKEN);
        const produto = await client.produtos.create(newProductSchema());

        assert(produto);
        assert(produto.id);

        createdProdutos.push(produto);
    });

    // error forbidden
    it.skip('create product with variacao', async () => {
        const client = new BlingApi(API_TOKEN);
        const data = { ...newProductSchema() }

        const produto = await client.produtos.create(data);

        const res = await client.produtosVariacoes.gerarCombinacoes(produto.id, [
            { nome: 'Cor', opcoes: ['Azul', 'Vermelho', 'Amarelo'] }
        ]);

        console.log(res);
        assert(produto);
        createdProdutos.push(produto);
    });

    it.only('create order', async () => {
        const client = new BlingApi(API_TOKEN);

        const pedido = await client.pedidosCompras.create({
            data: formatDate(new Date(), 'dd/MM/yyyy'),
        });
    });
});
