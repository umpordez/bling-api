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
            let productsMap = {};
            for (const p of products) { productsMap[p.id] = p; }

            const productsIds = Object.keys(productsMap);
            const clientEstoques = new EstoquesClient(this.token);

            const estoques = await clientEstoques.saldosAll(productsIds);

            for (const estoque of estoques) {
                productsMap[estoque.produto.id].estoque = estoque;
            }

            allProducts = allProducts.concat(Object.values(productsMap));
        }

        return allProducts;
    }
}

module.exports = ProdutosClient;
