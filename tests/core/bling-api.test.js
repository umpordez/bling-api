require('../test-helper');

const assert = require('assert');
const BlingApi = require('../../bling-api');

describe('BlingApi', () => {
    const { API_TOKEN } = process.env;

    it('initialize client', () => {
        const client = new BlingApi(API_TOKEN);

        assert(client);
        assert(client.apiToken);
    });
});
