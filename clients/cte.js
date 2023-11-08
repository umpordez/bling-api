const BaseClient = require('../core/base-client');

class CteClient extends BaseClient {
    get endpoint() { return 'cte'; }
}

module.exports = CteClient;
