enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

type Options = {
    method: METHODS;
    headers?: {
        [key: string]: string
    };
    timeout?: number;
    data?: {
        [key: string]: unknown
    };
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTPTransport {
    private apiUrl: string = ''

    constructor(apiPath: string) {
        this.apiUrl = `https://ya-praktikum.tech/api/v2${apiPath}`;
    }

    get(url: string, options: OptionsWithoutMethod = {}): Promise<unknown> {
        return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.GET});
    };

    put(url: string, options: OptionsWithoutMethod = {}): Promise<unknown> {
        return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.PUT});
    };

    post(url: string, options: OptionsWithoutMethod = {}): Promise<unknown> {
        return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.POST});
    };

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<unknown> {
        return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.DELETE});
    };

    async request(url: string, options: Options = { method: METHODS.GET }): Promise<unknown> {
        const {method, headers = { 'Content-Type': 'application/json' }, data, timeout = 0} = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
