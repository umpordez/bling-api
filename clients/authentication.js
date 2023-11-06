const BaseClient = require('../core/base-client');
const V = require('argument-validator');
const { CLIENT_ID, CLIENT_SECRET } = process.env;

class AuthenticationClient extends BaseClient {
    get endpoint() { return 'oauth'; }

    async getAuthorizationToken(code) {
        V.string(code, 'code');

        const token = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

        const res = await this.doRequest(
            'POST',
            `${this.endpoint}/token`,
            { grant_type: 'authorization_code', code },
            { 'Authorization': `Basic ${token}` }
        );

        return res;
    }

    async refreshToken(refreshToken) {
        V.string(refreshToken, 'refreshToken');

        const token = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

        const res = await this.doRequest(
            'POST',
            `${this.endpoint}/token`,
            { grant_type: 'refresh_token', refresh_token: refreshToken },
            { 'Authorization': `Basic ${token}` }
        );

        return res;
    }

}

module.exports = AuthenticationClient;
