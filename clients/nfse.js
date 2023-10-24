const BaseClient = require('../core/base-client');

// Notas de Serviços
class NfseClient extends BaseClient {
    get endpoint() { return 'nfse'; }
}

module.exports = NfseClient;
