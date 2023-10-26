const BaseClient = require('../core/base-client');

class LogisticasClient extends BaseClient {
    get endpoint() { return 'logisticas'; }
}

module.exports = LogisticasClient;
