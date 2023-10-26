const BaseClient = require('../core/base-client');

class ProdutosFornecedoresClient extends BaseClient {
    get endpoint() { return 'produtos/fornecedores'; }
}

module.exports = ProdutosFornecedoresClient;
