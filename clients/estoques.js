const BaseClient = require('../core/base-client');

class EstoquesClient extends BaseClient {
    get endpoint() { return 'estoques'; }

    saldos(depositId) {
        return this.doRequest('GET', `${this.endpoint}/saldos/${depositId}`);
    }

    saldosAll(productsIds) {
        return this.doRequest('GET', `${this.endpoint}/saldos`, {
            'idsProdutos[]': productsIds
        });
    }

}

module.exports = EstoquesClient;
