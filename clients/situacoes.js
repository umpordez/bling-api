const BaseClient = require('../core/base-client');

class SituacoesClient extends BaseClient {
    get endpoint() { return 'situacoes'; }
}

module.exports = SituacoesClient;
