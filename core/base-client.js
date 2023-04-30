const axios = require('axios');
const V = require('argument-validator');
const querystring = require('querystring');

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


const configByEnv = {
    prod: {
        baseUrl: 'https://www.bling.com.br/Api/v3'
    },

    dev: {
        baseUrl: 'https://www.bling.com.br/Api/v3'
    }
};

class BlingBaseClient {
    constructor(apiToken, env = 'prod') {
        V.string(apiToken, 'apiToken');
        V.string(env, 'env');

        this.apiToken = apiToken;
        this.baseUrl = configByEnv[env].baseUrl;

        this.lastRequests = [];
        this.lastResponses = [];
    }

    getAll(opts = {}) {
        return this.getAllPaginating(this.endpoint, { ...opts });
    }

    getById(id, opts = {}) {
        V.number(id, 'id');
        return this.doGetRequest(id, { ...opts });
    }

    async * getAllPaginating(url, params = {}) {
        let page = 1;
        let data;

        params.limit = params.limit || 100;

        do {
            data = await this.doRequest('GET', url, {
                ...params,
                page
            });

            yield data;
            page++;

            // let it breathe
            await sleep(1);
        } while (data.length >= params.limit);
    }

    async doRequest(method, url, body = {}) {
        V.string(method, 'method');
        V.string(url, 'url');

        method = method.toUpperCase();

        const headers = {
            'Accept': 'application/json',
            'X-API-KEY': this.apiToken
        };

        for (const key in body) {
            const value = body[key];
            if (!V.isArray(value)) { continue; }

            body[key] = value.join(';');
        }

        url = `${this.baseUrl}/${url}`;
        body.limit = 100;

        if (method === 'GET') {
            url += `?${querystring.encode(body)}`;
        } else {
            headers['Content-Type'] = 'application/json';
        }

        this.lastRequests = this.lastRequests.slice(-5);
        this.lastResponses = this.lastResponses.slice(-5);

        const options = {
            method,
            headers,
            url,
            data: method !== 'GET' ? JSON.stringify(body) : ''
        };

        this.lastRequest = { ...options, data: body };
        this.lastRequests.push(this.lastRequest);

        let response;
        const errorObject = new Error();

        try {
            const res = await axios(options);
            response = res.data;

            this.lastResponse = { body: res.data, headers: res.headers };
            this.lastResponses.push(this.lastResponse);
        } catch (ex) {
            ex.response = ex.response || ex.res;
            if (ex.response) {
                const { response } = ex;

                this.lastResponse = {
                    body: response.data,
                    headers: response.headers
                };

                this.lastResponses.push(this.lastResponse);
                const error = response.data && response.data.error;

                if (error) {
                    const { message, description, type } = error;
                    errorObject.message = `${type} - ${message}`;

                    errorObject.description = description;
                    errorObject.type = type;

                    throw errorObject;
                }
            }

            errorObject.message = ex.message;
            throw errorObject;
        }

        if (!response || !response.data) {
            throw new Error(`Received an invalid response from bling.`);
        }

        if (response.error) {
            const { message, description, type } = response.error;
            const err = new Error(`${type} - ${message}`);

            err.description = description;
            err.type = type;

            throw err;
        }

        return response.data;
    }

    async doGetRequest(url, params) {
        return this.doRequest('GET', url, params);
    }
}

module.exports = BlingBaseClient;
