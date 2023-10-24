const BaseClient = require('../core/base-client');

class ContasContabeisClient extends BaseClient {
    get endpoint() { return 'contas/contabeis'; }
}

module.exports = ContasContabeisClient;
