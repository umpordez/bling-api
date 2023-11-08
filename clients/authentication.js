const BaseClient = require('../core/base-client');
const V = require('argument-validator');

class AuthenticationClient extends BaseClient {
    constructor(clientId, clientSecret) {
        super();
        this.token = btoa(`${clientId}:${clientSecret}`);
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    get endpoint() { return 'oauth'; }

    async getAccessToken(code) {
        V.string(code, 'code');

        const res = await this.doRequest(
            'POST',
            `${this.endpoint}/token`,
            { grant_type: 'authorization_code', code },
            { 'Authorization': `Basic ${this.token}` }
        );

        return res;
    }

    async refreshToken(refreshToken) {
        V.string(refreshToken, 'refreshToken');

        const res = await this.doRequest(
            'POST',
            `${this.endpoint}/token`,
            { grant_type: 'refresh_token', refresh_token: refreshToken },
            { 'Authorization': `Basic ${this.token}` }
        );

        return res;
    }

}

module.exports = AuthenticationClient;
