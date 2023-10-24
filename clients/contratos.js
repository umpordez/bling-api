const BaseClient = require('../core/base-client');

class ContratosClient extends BaseClient {
    get endpoint() { return 'contratos'; }
}

module.exports = ContratosClient;
