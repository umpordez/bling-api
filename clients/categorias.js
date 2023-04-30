const BaseClient = require('../core/base-client');

class CategoriasClient extends BaseClient {
    constructor(apiToken) {
        super(apiToken);
        this.endpoint = 'categorias';
    }
}

module.exports = CategoriasClient;
