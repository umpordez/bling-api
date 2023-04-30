const BaseClient = require('../core/base-client');

class CamposCustomizadosClient extends BaseClient {
    constructor(apiToken) {
        super(apiToken);
        this.endpoint = 'camposcustomizados';
    }
}

module.exports = CamposCustomizadosClient;
