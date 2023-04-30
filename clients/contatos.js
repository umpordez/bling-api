const BaseClient = require('../core/base-client');

class ContatosClient extends BaseClient {
    constructor(apiToken) {
        super(apiToken);
        this.endpoint = 'contatos';
    }
}

module.exports = ContatosClient;
