const BaseClient = require('../core/base-client');

// Nota Fiscal Eletrônica
class NfeClient extends BaseClient {
    get endpoint() { return 'nfe'; }
}

module.exports = NfeClient;
