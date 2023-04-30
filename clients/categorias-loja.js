const BaseClient = require('../core/base-client');

class CategoriasLojaClient extends BaseClient {
    constructor(apiToken) {
        super(apiToken);
        this.endpoint = 'categoriasloja';
    }
}

module.exports = CategoriasLojaClient;
