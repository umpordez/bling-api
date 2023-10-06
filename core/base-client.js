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

    update(id, data = {}) {
        return this.doRequest('PUT', `${this.endpoint}/${id}`, data);
    }

    create(data = {}) {
        return this.doRequest('POST', this.endpoint, data);
    }

    delete(id) {
        return this.doRequest('DELETE', `${this.endpoint}/${id}`);
    }

    get(id, opts = {}) { return this.getById(id, opts); }

    getAll(opts = {}) {
        return this.getAllPaginating(this.endpoint, { ...opts });
    }

    getById(id, opts = {}) {
        V.number(id, 'id');
        return this.doGetRequest(`${this.endpoint}/${id}`, { ...opts });
    }

    async * getAllPaginating(url, params = {}) {
        let page = 1;
        let data;

        params.limite = params.limit || 100;

        do {
            data = await this.doRequest('GET', url, {
                ...params,
                pagina: page
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

        url = `${this.baseUrl}/${url}`;
        body.limite = 100;

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
                    const { fields, message, description, type } = error;
                    errorObject.message = `${type} - ${message}`;

                    errorObject.description = description;
                    errorObject.type = type;
                    errorObject.fields = fields;

                    if (fields && fields.length && !fields[0].length) {
                        errorObject.message += `\nFields: ${fields.map((f) =>
                            `Code: ${f.code}, ` +
                            `Namespace: ${f.namespace}, ` +
                            `Element: ${f.element}, ` +
                            `Msg: ${f.msg}`).join('\n')}`;
                    }

                    if (fields && fields.length && fields[0].length) {
                        for (const moreFields of fields) {
                            errorObject.message += `\nFields: ${moreFields.map((f) =>
                                `Code: ${f.code}, ` +
                                `Namespace: ${f.namespace}, ` +
                                `Element: ${f.element}, ` +
                                `Msg: ${f.msg}`).join('\n')}`;
                        }
                    }

                    console.log(errorObject.message);
                    throw errorObject;
                }
            }

            errorObject.message = ex.message;
            throw errorObject;
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
