require('../test-helper');

const assert = require('assert');
const CategoriasProdutosClient = require('../../clients/categorias-produtos');

describe('Bling! API Categorias Client', () => {
    const { API_TOKEN } = process.env;
    const createdCategories = [];

    it('initialize client', () => {
        const client = new CategoriasProdutosClient(API_TOKEN);
        assert(client);
    });

    it.only('create', async () => {
        const client = new CategoriasProdutosClient(API_TOKEN);
        const res = await client.create({
            descricao: `Test #${new Date().getTime()}`
        });

        createdCategories.push(res);
    });

    it('getById', async () => {
        const client = new CategoriasProdutosClient(API_TOKEN);
        const res = await client.create({
            descricao: `Test #${new Date().getTime()}`
        });

        createdCategories.push(res);
        const cat = await client.getById(res.id);

        assert.strictEqual(cat.id, res.id);
    });

    it('update', async () => {
        const client = new CategoriasProdutosClient(API_TOKEN);
        const res = await client.create({
            descricao: `Test #${new Date().getTime()}`
        });

        createdCategories.push(res);
        await client.update(res.id, {
            descricao: `foobar ${new Date().getTime()}`
        });

        const cat = await client.getById(res.id);
        assert(/foobar/.test(cat.descricao));
    });

    it('getAll()', async () => {
        const client = new CategoriasProdutosClient(API_TOKEN);

        for await (const categories of client.getAll()) {
            assert(categories.length);
            for (const cat of categories) {
                assert(cat.id);
                assert(cat.descricao);
            }
        }
    });

    it.skip('delete', async () => {
        const client = new CategoriasProdutosClient(API_TOKEN);
        const res = await client.create({
            descricao: `Test #${new Date().getTime()}`
        });

        await client.delete(res.id);
    });
});
