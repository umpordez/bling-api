const BaseClient = require('../core/base-client');
const EstoquesClient = require('./estoques');

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
            const productsIds = products.map(p => p.id);
            const clientEstoques = new EstoquesClient(this.apiToken);

            const estoques = await clientEstoques.saldos(productsIds);
            allProducts = allProducts.concat(products);
        }

        return allProducts;
    }
}

module.exports = ProdutosClient;
