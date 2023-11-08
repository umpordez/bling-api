const BaseClient = require('../core/base-client');

class BorderosClient extends BaseClient {
    get endpoint() { return 'borderos'; }
}

module.exports = BorderosClient;
