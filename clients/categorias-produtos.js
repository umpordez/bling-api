const BaseClient = require('../core/base-client');

class CategoriasProdutosClient extends BaseClient {
    get endpoint() { return 'categorias/produtos'}
}

module.exports = CategoriasProdutosClient;
