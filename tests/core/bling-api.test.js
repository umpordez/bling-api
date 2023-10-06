require('../test-helper');

const assert = require('assert');
const BlingApi = require('../../bling-api');

const newProductSchema = () => ({
    "id": 0,
    "codigo": new Date().getTime(),
    "nome": `Test #${new Date().getTime()}`,
    "dataValidade": "",
    "unidade": "Un",
    "tipo": "P",
    "preco": 10.00,
    "pesoLiquido": 0,
    "pesoBruto": 0,
    "volumes": null,
    "itensPorCaixa": 0,
    "condicao": 1,
    "freteGratis": false,
    "formato": "S",
    "categoria": {
        "id": "8248804"
    },
    "estoque": {
        "minimo": 0,
        "maximo": 0
    },
    "dimensoes": {
        "largura": 0,
        "altura": 0,
        "profundidade": 0,
        "unidadeMedida": null
    },
    "tributacao": {
        "alqValorAproxImpostos": 0,
        "origem": null,
        "percentualTributos": 0,
        "grupoProduto": {
            "id": null
        },
        "valorBaseStRetencao": 0,
        "valorStRetencao": 0,
        "valorICMSSubstituto": 0,
        "valorIpiFixo": 0,
        "valorPisFixo": 0,
        "valorCofinsFixo": 0,
        "codigoANP": "",
        "descricaoANP": "",
        "percentualGLP": 0,
        "percentualGasNacional": 0,
        "percentualGasImportado": 0,
        "valorPartida": 0,
        "tipoArmamento": "",
        "descricaoCompletaArmamento": "",
        "dadosAdicionais": ""
    },
    "lojasVirtuais": {
        "idProdutoIntegracao": "",
        "sincronizar": 0,
        "produtoVariacao": ""
    },
    "midia": {
        "video": {},
        "imagens": {
            "interna": [],
            "externa": []
        }
    },
    "linhaProduto": {
        "id": "0"
    },
    "trackingProperties": {
        "event": "SaveIncompleteProduct"
    },
    "fornecedores": [],
    "variacoes": [],
    "actionEstoque": "",
    "tags": [],
    "camposCustomizados": [],
    "produtoPai": {
        "id": null,
        "cloneInfo": false
    },
    "excluir": false

});

describe('BlingApi', () => {
    const { API_TOKEN } = process.env;
    const createdProdutos = [];

    after(async () => {
        const client = new BlingApi(API_TOKEN);

        for (const prod of createdProdutos) {
            await client.produtos.situacoes(prod.id, 'E');
            await client.produtos.delete(prod.id);
        }
    });

    it('initialize client', () => {
        const client = new BlingApi(API_TOKEN);

        assert(client);
        assert(client.apiToken);
    });

    it('create product', async () => {
        const client = new BlingApi(API_TOKEN);
        const produto = await client.produtos.create(newProductSchema());

        assert(produto);
        assert(produto.id);

        createdProdutos.push(produto);
    });

    // error forbidden
    it.skip('create product with variacao', async () => {
        const client = new BlingApi(API_TOKEN);
        const data = { ...newProductSchema() }

        const produto = await client.produtos.create(data);

        const res = await client.produtosVariacoes.gerarCombinacoes(produto.id, [
            { nome: 'Cor', opcoes: ['Azul', 'Vermelho', 'Amarelo'] }
        ]);

        console.log(res);
        assert(produto);
        createdProdutos.push(produto);
    });

    it.skip('create order', async () => {
        const client = new BlingApi(API_TOKEN);

        const pedido = await client.pedidosCompras.create({
            "numero": 12,
            "data": "2020-08-24",
            "dataPrevista": "2020-08-30",
            "fornecedor": {
                "id": 12345678
            },
            "situacao": {
                "valor": 0
            },
            "ordemCompra": "351635",
            "observacoes": "Observação sobre o pedido.",
            "observacoesInternas": "Observação interna sobre o pedido.",
            "desconto": {
                "valor": 15.45,
                "unidade": "REAL"
            },
            "categoria": {
                "id": 12345678
            },
            "tributacao": {
                "totalICMS": 5.55
            },
            "transporte": {
                "frete": 15.78,
                "transportador": "Zé Transportes",
                "fretePorConta": 0,
                "pesoBruto": 15.78,
                "volumes": 11
            },
            "itens": [
                {
                    "descricao": "Copo do Bling",
                    "codigoFornecedor": "46546546",
                    "unidade": "Un",
                    "valor": 149.99,
                    "quantidade": 12,
                    "aliquotaIPI": 15.85,
                    "descricaoDetalhada": "Descrição do item do pedido.",
                    "produto": {
                        "id": createdProdutos[0].id
                    }
                }
            ],
            "parcelas": [
                {
                    "valor": 2090.66,
                    "dataVencimento": "2020-09-23",
                    "observacao": "Observação da parcela.",
                    "formaPagamento": {
                        "id": 12345678
                    }
                }
            ]
        });
    });
});
