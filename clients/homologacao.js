const BaseClient = require('../core/base-client');

class HomologacaoClient extends BaseClient {
    get endpoint() { return 'homologacao'; }
}

module.exports = HomologacaoClient;
