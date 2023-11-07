require('./test-helper');

const assert = require('assert');
const { BlingApi, AuthClient } = require('../bling-api');
const { CLIENT_ID, CLIENT_SECRET } = process.env;

describe('OAuth authentication', () => {
    const { BLING_CODE } = process.env;
    let data = {};

    it('Get token client', async () => {
        const auth = new AuthClient(CLIENT_ID, CLIENT_SECRET);
        const res = await auth.getAuthorizationToken(BLING_CODE);

        console.log(res);
        assert(res);

        data = { ...res };
    });

    it('Refresh token', async () => {
        const auth = new AuthClient(CLIENT_ID, CLIENT_SECRET);
        const res = await auth.refreshToken(data.refresh_token);

        console.log(res);
        assert(res);

        data = { ...res };
    });

    it.only('Test request', async () => {
        const client = new BlingApi(test.access_token);

        for await (const products of client.produtos.getAll()) {
            assert(products.length);
            for (const prod of products) {
                assert(prod.id);
                console.log(prod);
            }
        }
    });
});
