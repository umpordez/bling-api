const BaseClient = require('../core/base-client');

class NaturezaOperacoesClient extends BaseClient {
    get endpoint() { return 'natureza-operacoes'; }
}

module.exports = NaturezaOperacoesClient;
