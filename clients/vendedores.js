const BaseClient = require('../core/base-client');

class VendedoresClient extends BaseClient {
    get endpoint() { return 'vendedores'; }
}

module.exports = VendedoresClient;
