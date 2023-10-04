const BaseClient = require('../core/base-client');

class EstoquesClient extends BaseClient {
    get endpoint() { return 'estoques'; }
}

module.exports = EstoquesClient;
