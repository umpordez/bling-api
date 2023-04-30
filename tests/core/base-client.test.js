require('../test-helper');

const assert = require('assert');
const BlingBaseClient = require('../../core/base-client');

describe('Bling BaseClient', () => {
    const { API_TOKEN } = process.env;

    it('initialize client', () => {
        const client = new BlingBaseClient(API_TOKEN);

        assert(client);
    });
});
