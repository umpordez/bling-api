require('../test-helper');

const assert = require('assert');
const ContatosClient = require('../../clients/contatos');

describe('Bling! API Contatos Client', () => {
    const { TOKEN } = process.env;
    const createdContatos = [];

    after(async () => {
        const client = new ContatosClient(TOKEN);
        for (const cat of createdContatos) {
            await client.delete(cat.id);
        }
    });

    it('initialize client', () => {
        const client = new ContatosClient(TOKEN);
        assert(client);
    });

    it.only('create', async () => {
        const client = new ContatosClient(TOKEN);
        const res = await client.create({
            nome: `Test #${new Date().getTime()}`,
            tipo: 'F'
        });

        console.log(res);
        createdContatos.push(res);
    });

    it.only('update', async () => {
        const client = new ContatosClient(TOKEN);
        const res = await client.update(createdContatos[0].id, {
            nome: `Test #${new Date().getTime()}`,
            tipo: 'F'
        });
        console.log(res);
    });

    it('getAll()', async () => {
        const client = new ContatosClient(TOKEN);

        try {
            let allContacts = [];
            for await (const contatos of client.getAll({ criterio: 1 })) {
                allContacts = allContacts.concat(contatos);
            }
            console.log(allContacts.length);
            assert(allContacts.length);
        } catch (ex) {
            console.error(ex);
            console.log(client.lastRequest);
        }
    });
});
