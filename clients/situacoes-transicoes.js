const BaseClient = require('../core/base-client');

class SituacoesTransicoesClient extends BaseClient {
    get endpoint() { return 'situacoes/transicoes'; }
}

module.exports = SituacoesTransicoesClient;
