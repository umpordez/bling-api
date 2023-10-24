const BaseClient = require('../core/base-client');

class ContasReceberClient extends BaseClient {
    get endpoint() { return 'contas/receber'; }
}

module.exports = ContasReceberClient;
