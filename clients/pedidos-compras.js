const BaseClient = require('../core/base-client');

class PedidosComprasClient extends BaseClient {
    get endpoint() { return 'pedidos/compras'; }
}

module.exports = PedidosComprasClient;
