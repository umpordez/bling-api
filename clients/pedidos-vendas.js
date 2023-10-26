const V = require('argument-validator');
const BaseClient = require('../core/base-client');

class PedidosVendaClient extends BaseClient {
    get endpoint() { return 'pedidos/vendas'; }

    updateSituacao(pedidoId, situacaoId) {
        V.number(pedidoId, 'pedidoId');
        V.number(situacaoId, 'situacaoId');
        return this.doRequest(
            'PATCH',
            `${this.endpoint}/${pedidoId}/situacoes/${situacaoId}`
        );
    }
}

module.exports = PedidosVendaClient;
