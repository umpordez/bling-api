const BaseClient = require('../core/base-client');

class ProdutosClient extends BaseClient {
    get endpoint() { return 'produtos'; }

    situacoes(id, situacao) {
        return this.doRequest('PATCH', `${this.endpoint}/${id}/situacoes`, {
            situacao
        });
    }
}

module.exports = ProdutosClient;
