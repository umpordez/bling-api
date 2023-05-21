const BaseClient = require('../core/base-client');

class ContatosClient extends BaseClient {
    get endpoint() { return 'contatos'; }
}

module.exports = ContatosClient;
