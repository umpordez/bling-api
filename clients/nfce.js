const BaseClient = require('../core/base-client');

// Nota Fiscal de Consumidor Eletrônica
class NfceClient extends BaseClient {
    get endpoint() { return 'nfce'; }
}

module.exports = NfceClient;
