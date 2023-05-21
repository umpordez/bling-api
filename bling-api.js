const V = require('argument-validator');

const SituacoesClient = require('./clients/situacoes');
const BorderosClient = require('./clients/borderos');
const CamposCustomizadosClient = require('./clients/campos-customizados');
const CategoriasLojaClient = require('./clients/categorias-loja');
const CategoriasClient = require('./clients/categorias');
const ContatosClient = require('./clients/contatos');
const CteClient = require('./clients/cte');
const EstoquesClient = require('./clients/estoques');
const PedidosVendasClient = require('./clients/pedidos-vendas');
const ProdutosClient = require('./clients/produtos');

class BlingApi {
    constructor(token) {
        V.string(token, 'token');
        this.apiToken = token;

        this.lastRequests = [];
        this.lastResponses = [];

        this.situacoes = this.initClient(SituacoesClient);
        this.borderos = this.initClient(BorderosClient);
        this.camposCustomizados = this.initClient(CamposCustomizadosClient);
        this.categoriasLoja = this.initClient(CategoriasLojaClient);
        this.categorias = this.initClient(CategoriasClient);
        this.contatos = this.initClient(ContatosClient);
        this.cte = this.initClient(CteClient);
        this.estoques = this.initClient(EstoquesClient);
        this.pedidosVendas = this.initClient(PedidosVendasClient);
        this.produtos = this.initClient(ProdutosClient);
    }

    initClient(Client) {
        const client = new Client(this.apiToken);
        const self = this;

        const _doRequest = client.doRequest;

        client.doRequest = async function p() {
            try {
                const res = await _doRequest.apply(client, arguments);
                return res;
            } finally {
                self.lastRequests = self.lastRequests.slice(-5);
                self.lastResponses = self.lastResponses.slice(-5);

                self.lastRequests.push(client.lastRequest);
                self.lastResponses.push(client.lastResponse);
            }
        };

        return client;
    }
}

module.exports = BlingApi;
