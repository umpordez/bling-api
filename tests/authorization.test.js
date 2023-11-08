require('./test-helper');

const assert = require('assert');
const { BlingApi, AuthClient } = require('../bling-api');
const { CLIENT_ID, CLIENT_SECRET } = process.env;

describe('OAuth authentication', () => {
    const { BLING_CODE } = process.env;
    let data = {};

    it('Get token client', async () => {
        const auth = new AuthClient(CLIENT_ID, CLIENT_SECRET);
        const res = await auth.getAccessToken(BLING_CODE);

        console.log(res);
        assert(res);

        data = { ...res };
    });

    it('Refresh token', async () => {
        const auth = new AuthClient(CLIENT_ID, CLIENT_SECRET);
        const res = await auth.getTokenByRefreshToken(data.refresh_token);

        console.log(res);
        assert(res);

        data = { ...res };
    });

    it('Test request', async () => {
        console.log(data);
        const client = new BlingApi(data.access_token);

        for await (const products of client.produtos.getAll()) {
            assert(products.length);
            for (const prod of products) {
                assert(prod.id);
                console.log(prod);
            }
        }
    });
});
