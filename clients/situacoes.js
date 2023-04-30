const BaseClient = require('../core/base-client');

class SituacoesClient extends BaseClient {
    constructor(apiToken) {
        super(apiToken);
        this.endpoint = 'situacoes';
    }

    getAll() { throw new Error('Not available'); }
}

module.exports = SituacoesClient;
