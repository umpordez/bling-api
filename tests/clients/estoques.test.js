require('../test-helper');

const assert = require('assert');
const EstoquesClient = require('../../clients/estoques');
const ProdutosClient = require('../../clients/produtos');

describe('Bling! API Estoque Client', () => {
    const { TOKEN } = process.env;

    it('initialize client', () => {
        const client = new EstoquesClient(TOKEN);
        assert(client);
    });

    it('get estoque by productId', async () => {
        const clientEstoques = new EstoquesClient(TOKEN);
        const clientProdutos = new ProdutosClient(TOKEN);

        for await (const products of clientProdutos.getAll()) {
            const produtosIds = products.map(p => p.id);
            const estoques = await clientEstoques.saldos(produtosIds[0]);

            assert(estoques.length)
            console.log(estoques.length)
            return
        }
    });

    it.only('get estoque by products', async () => {
        const clientEstoques = new EstoquesClient(TOKEN);
        const clientProdutos = new ProdutosClient(TOKEN);

        for await (const products of clientProdutos.getAll()) {
            const produtosIds = products.map(p => p.id);
            const estoques = await clientEstoques.saldosAll(produtosIds);

            assert(estoques.length)
            console.log(estoques)
            return
        }
    });

});
