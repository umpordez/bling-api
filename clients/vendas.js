const BaseClient = require('../core/base-client');

class VendasClient extends BaseClient {
    constructor(apiToken) {
        super(apiToken);
        this.endpoint = 'vendas';
    }
}

module.exports = VendasClient;
