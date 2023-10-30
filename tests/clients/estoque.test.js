require('../test-helper');

const assert = require('assert');
const EstoquesClient = require('../../clients/estoques');
const ProdutosClient = require('../../clients/produtos');

describe('Bling! API Estoque Client', () => {
    const { API_TOKEN } = process.env;

    it('initialize client', () => {
        const client = new EstoquesClient(API_TOKEN);
        assert(client);
    });

    it('get estoque by products', async () => {
        const clientEstoques = new EstoquesClient(API_TOKEN);
        const clientProdutos = new ProdutosClient(API_TOKEN);

        for await (const products of clientProdutos.getAll()) {
            const produtosIds = products.map(p => p.id);
            console.log(produtosIds);
            const estoques = await clientEstoques.saldos(produtosIds);

            assert(estoques.length)
            console.log(estoques.length)
            return
        }
    });

});
