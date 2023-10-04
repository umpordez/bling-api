const BaseClient = require('../core/base-client');

class ContasPagarClient extends BaseClient {
    get endpoint() { return 'contas/pagar'; }
}

module.exports = ContasPagarClient;
