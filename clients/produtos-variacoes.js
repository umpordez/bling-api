const BaseClient = require('../core/base-client');

class ProdutosVariacoesClient extends BaseClient {
    get endpoint() { return 'produtos/variacoes'; }
}

module.exports = ProdutosVariacoesClient;
