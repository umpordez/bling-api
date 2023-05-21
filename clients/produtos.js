const BaseClient = require('../core/base-client');

class ProdutosClient extends BaseClient {
    get endpoint() { return 'produtos'; }
}

module.exports = ProdutosClient;
