require('../test-helper');

const assert = require('assert');
const ContatosClient = require('../../clients/contatos');

describe('Bling! API Contatos Client', () => {
    const { API_TOKEN } = process.env;
    const createdContatos = [];

    after(async () => {
        const client = new ContatosClient(API_TOKEN);
        for (const cat of createdContatos) {
            await client.delete(cat.id);
        }
    });

    it('initialize client', () => {
        const client = new ContatosClient(API_TOKEN);
        assert(client);
    });

    it.only('create', async () => {
        const client = new ContatosClient(API_TOKEN);
        const res = await client.create({
            nome: `Test #${new Date().getTime()}`,
            tipo: 'F'
        });

        createdContatos.push(res);
    });

    it.only('getAll()', async () => {
        const client = new ContatosClient(API_TOKEN);

        try {
            for await (const contatos of client.getAll({ criterio: 3 })) {
                assert(contatos.length);
                for (const c of contatos) {
                    console.log(c);
                }
            }
        } catch (ex) {
            console.error(ex);
            console.log(client.lastRequest);
        }
    });
});
