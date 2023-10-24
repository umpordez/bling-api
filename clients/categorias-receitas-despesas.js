const BaseClient = require('../core/base-client');

class CategoriasReceitasDespesasClient extends BaseClient {
    get endpoint() { return 'categorias/receitas-despesas'}
}

module.exports = CategoriasReceitasDespesasClient;
