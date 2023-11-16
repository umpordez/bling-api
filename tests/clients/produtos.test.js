require('../test-helper');

const assert = require('assert');
const ProdutosClient = require('../../clients/produtos');

describe('Bling! API Produtos Client', () => {
    const { TOKEN } = process.env;
    const createdProdutos = [];

    after(async () => {
        const client = new ProdutosClient(TOKEN);
        for (const prod of createdProdutos) {
            await client.delete(prod.id);
        }
    });

    it('initialize client', () => {
        const client = new ProdutosClient(TOKEN);
        assert(client);
    });

    it('getAll()', async () => {
        const client = new ProdutosClient(TOKEN);

        for await (const products of client.getAll()) {
            assert(products.length);
            for (const prod of products) {
                assert(prod.id);
                console.log(prod)
            }
        }
    });

    it.only('getAllWithStock()', async () => {
        const client = new ProdutosClient(TOKEN);
        const products = await client.getAllWithStock({ criterio: 5 });

        console.log(products);
        console.log(products.length);
    });

    it.skip('create', async () => {
        const client = new ProdutosClient(TOKEN);

        const res = await client.create({
            nome: `Test #${new Date().getTime()}`,
            tipo: 'P',
            formato: 'S'
        });

        console.log(res);

        createdProdutos.push(res);
    });

    it('getById', async () => {
        const client = new ProdutosClient(TOKEN);
        const res = await client.create({
            descricao: `Test #${new Date().getTime()}`
        });

        createdProdutos.push(res);
        const prod = await client.getById(res.id);

        assert.strictEqual(prod.id, res.id);
    });

    it('update', async () => {
        const client = new ProdutosClient(TOKEN);
        const res = await client.create({
            descricao: `Test #${new Date().getTime()}`
        });

        createdProdutos.push(res);
        await client.update(res.id, {
            descricao: `foobar ${new Date().getTime()}`
        });

        const prod = await client.getById(res.id);
        assert(/foobar/.test(prod.descricao));
    });


    it.skip('delete', async () => {
        const client = new ProdutosClient(TOKEN);
        const res = await client.create({
            descricao: `Test #${new Date().getTime()}`
        });

        await client.delete(res.id);
    });
});
