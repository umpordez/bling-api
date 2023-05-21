const BaseClient = require('../core/base-client');

class PedidosVendaClient extends BaseClient {
    get endpoint() { return 'pedidods/vendas'; }
}

module.exports = PedidosVendaClient;
