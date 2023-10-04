const BaseClient = require('../core/base-client');

class ProdutosEstruturasClient extends BaseClient {
    get endpoint() { return 'produtos/estruturas'; }
}

module.exports = ProdutosEstruturasClient;
