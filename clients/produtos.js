const BaseClient = require('../core/base-client');

class ProdutosClient extends BaseClient {
    get endpoint() { return 'produtos'; }

    situacoes(id, situacao) {
        return this.doRequest('PATCH', `${this.endpoint}/${id}/situacoes`, {
            situacao
        });
    }

    async getAllWithStock() {
        let allProducts = [];

        for await (const products of this.getAll()) {
            allProducts = allProducts.concat(products);
        }

        return allProducts;
    }
}

module.exports = ProdutosClient;
