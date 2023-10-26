const BaseClient = require('../core/base-client');

class DepositosClient extends BaseClient {
    get endpoint() { return 'depositos'; }
}

module.exports = DepositosClient;
