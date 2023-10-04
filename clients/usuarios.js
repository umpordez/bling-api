const BaseClient = require('../core/base-client');

class UsuariosClient extends BaseClient {
    get endpoint() { return 'usuarios'; }
}

module.exports = UsuariosClient;
