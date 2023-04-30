require('../test-helper');

const assert = require('assert');
const CategoriassClient = require('../../clients/categorias');

describe('Bling! API Categoriass Client', () => {
    const { API_TOKEN } = process.env;

    it('initialize client', () => {
        const client = new CategoriassClient(API_TOKEN);
        assert(client);
    });

    it('getAll()', async () => {
        const client = new CategoriassClient(API_TOKEN);

        for await (const cat of client.getAll()) {
            console.log(cat);
        }
    });
});
