const BaseClient = require('../core/base-client');

class CamposCustomizadosClient extends BaseClient {
    get endpoint() { return 'camposcustomizados'; }
}

module.exports = CamposCustomizadosClient;
