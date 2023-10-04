const BaseClient = require('../core/base-client');

class FormasPagamentosClient extends BaseClient {
    get endpoint() { return 'formas-pagamentos'; }
}

module.exports = FormasPagamentosClient;
