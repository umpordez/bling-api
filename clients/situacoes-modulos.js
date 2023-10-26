const BaseClient = require('../core/base-client');

class SituacoesModulosClient extends BaseClient {
    get endpoint() { return 'situacoes/modulos'; }
}

module.exports = SituacoesModulosClient;
