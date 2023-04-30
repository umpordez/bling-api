const V = require('argument-validator');

const SituacoesClient = require('./clients/situacoes');

class BlingApi {
    constructor(token) {
        V.string(token, 'token');
        this.apiToken = token;

        this.lastRequests = [];
        this.lastResponses = [];

        this.situacoes = this.initClient(SituacoesClient);
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
