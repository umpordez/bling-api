const BaseClient = require('../core/base-client');

class BorderosClient extends BaseClient {
    constructor(apiToken) {
        super(apiToken);
        this.endpoint = 'borderos';
    }
}

module.exports = BorderosClient;
