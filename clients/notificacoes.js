const BaseClient = require('../core/base-client');

class NotificacoesClient extends BaseClient {
    get endpoint() { return 'notificacoes'; }
}

module.exports = NotificacoesClient;
