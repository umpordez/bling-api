const BaseClient = require('../core/base-client');

class CteClient extends BaseClient {
    constructor(apiToken) {
        super(apiToken);
        this.endpoint = 'cte';
    }
}

module.exports = CteClient;
