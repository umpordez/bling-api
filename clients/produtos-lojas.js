const BaseClient = require('../core/base-client');

class ProdutosLojasClient extends BaseClient {
    get endpoint() { return 'produtos/lojas'; }
}

module.exports = ProdutosLojasClient;
