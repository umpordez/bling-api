const BaseClient = require('../core/base-client');

class LogisticasObjetosClient extends BaseClient {
    get endpoint() { return 'logisticas/objetos'; }
}

module.exports = LogisticasObjetosClient;
