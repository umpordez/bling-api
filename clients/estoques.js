const BaseClient = require('../core/base-client');

class EstoquesClient extends BaseClient {
    get endpoint() { return 'estoques'; }

    saldos(productsIds) {
        return this.doRequest('GET', `${this.endpoint}/saldos`, {
            idsProdutos: [ productsIds[0] ]
        });
    }

}

module.exports = EstoquesClient;
