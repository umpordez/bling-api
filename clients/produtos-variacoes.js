const BaseClient = require('../core/base-client');

class ProdutosVariacoesClient extends BaseClient {
    get endpoint() { return 'produtos/variacoes'; }

    //https://developer.bling.com.br/referencia#/Produtos%20-%20Varia%C3%A7%C3%B5es/post_produtos_variacoes_atributos_gerar_combinacoes
    gerarCombinacoes(id, atributos) {
        return this.doRequest('POST', `${this.endpoint}/atributos/gerar-combinacoes`, {
            produtoPai: { id },
            atributos
        });
    }

    variacoes(id, atributos) {
        return this.doRequest('POST', `produtovariacao/atributo`, {
            idProdutoPai: { id },
            atributos
        });
    }
}

module.exports = ProdutosVariacoesClient;
