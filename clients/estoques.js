const BaseClient = require('../core/base-client');

class EstoquesClient extends BaseClient {
    get endpoint() { return 'estoques'; }

    saldos(depositId) {
        return this.doRequest('GET', `${this.endpoint}/saldos/${depositId}`);
    }

    saldosAll(productsIds) {
        let queryString = '';

        for (let i = 0; i <= productsIds.length; i++) {
            if (i < (productsIds.length - 1)) {
                queryString += `idsProdutos%5B%5D=${productsIds[i]}&`;
            }
            else if (i === (productsIds.length - 1)) {
                queryString += `idsProdutos%5B%5D=${productsIds[i]}`;
            }
        }

        return this.doRequest('GET', `${this.endpoint}/saldos?${queryString}` );
    }

}

module.exports = EstoquesClient;
