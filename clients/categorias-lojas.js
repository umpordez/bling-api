const BaseClient = require('../core/base-client');

class CategoriasLojasClient extends BaseClient {
    get endpoint() { return 'categorias/lojas'}
}

module.exports = CategoriasLojasClient;
