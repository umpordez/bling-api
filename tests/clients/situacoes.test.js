require('../test-helper');

const assert = require('assert');
const SituacoesClient = require('../../clients/situacoes');

describe('Bling! API Situacoes Client', () => {
    const { API_TOKEN } = process.env;

    it('initialize client', () => {
        const client = new SituacoesClient(API_TOKEN);
        assert(client);
    });
});
