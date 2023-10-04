const BaseClient = require('../core/base-client');

class ContatosTiposClient extends BaseClient {
    get endpoint() { return 'contatos/tipos'; }
}

module.exports = ContatosTiposClient;
