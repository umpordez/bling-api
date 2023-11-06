const V = require('argument-validator');

const AuthClient = require('./clients/authentication');
const BorderosClient = require('./clients/borderos');
const CamposCustomizadosClient = require('./clients/campos-customizados');
const CategoriasLojasClient = require('./clients/categorias-lojas');
const CategoriasProdutosClient = require('./clients/categorias-produtos');
const CategoriasReceitasDespesasClient = require('./clients/categorias-receitas-despesas');
const ContasContabeisClient = require('./clients/contas-contabeis');
const ContasPagarClient = require('./clients/contas-pagar');
const ContasReceberClient = require('./clients/contas-receber');
const ContatosClient = require('./clients/contatos');
const ContatosTiposClient = require('./clients/contatos-tipos');
const ContratosClient = require('./clients/contratos');
const CteClient = require('./clients/cte');
const DepositosClient = require('./clients/depositos');
const EmpresasClient = require('./clients/empresas');
const EstoquesClient = require('./clients/estoques');
const FormasPagamentosClient = require('./clients/formas-pagamentos');
const HomologacaoClient = require('./clients/homologacao');
const LogisticasClient = require('./clients/logisticas');
const LogisticasObjetosClient = require('./clients/logisticas-objetos');
const NaturezasOperacoesClient = require('./clients/naturezas-operacoes');
const NfceClient = require('./clients/nfce');
const NfeClient = require('./clients/nfe');
const NfseClient = require('./clients/nfse');
const NotificacoesClient = require('./clients/notificacoes');
const PedidosComprasClient = require('./clients/pedidos-compras');
const PedidosVendasClient = require('./clients/pedidos-vendas');
const ProdutosClient = require('./clients/produtos');
const ProdutosEstruturasClient = require('./clients/produtos-estruturas');
const ProdutosFornecedoresClient = require('./clients/produtos-fornecedores');
const ProdutosLojasClient = require('./clients/produtos-lojas');
const ProdutosVariacoesClient = require('./clients/produtos-variacoes');
const SituacoesClient = require('./clients/situacoes');
const SituacoesModulosClient = require('./clients/situacoes-modulos');
const SituacoesTransicoesClient = require('./clients/situacoes-transicoes');
const UsuariosClient = require('./clients/usuarios');
const VendedoresClient = require('./clients/vendedores');

class BlingApi {
    constructor(token) {
        V.string(token, 'token');
        this.apiToken = token;

        this.lastRequests = [];
        this.lastResponses = [];

        this.borderos = this.initClient(BorderosClient);
        this.camposCustomizados = this.initClient(CamposCustomizadosClient);
        this.categoriasLoja = this.initClient(CategoriasLojasClient);
        this.categoriasProdutos = this.initClient(CategoriasProdutosClient);
        this.categoriasReceitasDespesas = this.initClient(CategoriasReceitasDespesasClient);
        this.contasContabeis = this.initClient(ContasContabeisClient);
        this.contasPagar = this.initClient(ContasPagarClient);
        this.contasReceber = this.initClient(ContasReceberClient);
        this.contatos = this.initClient(ContatosClient);
        this.contatosTipos = this.initClient(ContatosTiposClient);
        this.contratos = this.initClient(ContratosClient);
        this.cte = this.initClient(CteClient);
        this.depositos = this.initClient(DepositosClient);
        this.empresas = this.initClient(EmpresasClient);
        this.estoques = this.initClient(EstoquesClient);
        this.formasPagamentos = this.initClient(FormasPagamentosClient);
        this.homologacao = this.initClient(HomologacaoClient);
        this.logisticas = this.initClient(LogisticasClient);
        this.logisticasObjetos = this.initClient(LogisticasObjetosClient);
        this.naturezaOperacoes = this.initClient(NaturezasOperacoesClient);
        this.nfce = this.initClient(NfceClient);
        this.nfe = this.initClient(NfeClient);
        this.nfse = this.initClient(NfseClient);
        this.notificacoes = this.initClient(NotificacoesClient);
        this.pedidosCompras = this.initClient(PedidosComprasClient);
        this.pedidosVendas = this.initClient(PedidosVendasClient);
        this.produtos = this.initClient(ProdutosClient);
        this.produtosEstruturas = this.initClient(ProdutosEstruturasClient);
        this.produtosFornecedores = this.initClient(ProdutosFornecedoresClient);
        this.produtosLojas = this.initClient(ProdutosLojasClient);
        this.produtosVariacoes = this.initClient(ProdutosVariacoesClient);
        this.situacoes = this.initClient(SituacoesClient);
        this.situacoesModulos = this.initClient(SituacoesModulosClient);
        this.situacoesTransicoes = this.initClient(SituacoesTransicoesClient);
        this.usuarios = this.initClient(UsuariosClient);
        this.vendedores = this.initClient(VendedoresClient);
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

module.exports = { BlingApi, AuthClient };
