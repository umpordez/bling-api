const BaseClient = require('../core/base-client');

class PedidosVendaClient extends BaseClient {
    get endpoint() { return 'pedidos/vendas'; }
}

module.exports = PedidosVendaClient;
