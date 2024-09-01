const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    // Здесь достаточно и [object Object] для объекта
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    get = (url, options = {}) => {
        const newUrl = options.data ? `${url}${queryStringify(options.data)}` : url;

        console.log('newUrl', newUrl);

        return this.request(newUrl, {...options, method: METHODS.GET}, options.timeout);
    };

    put = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    post = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    delete = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url, options, timeout = 5000) => {
        const {method, headers = {}, data} = options;

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

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

function fetchWithRetry(url, options) {
    const { retries = 3, ...fetchOptions } = options;

    if (retries <= 1) {
        return Promise.reject(new Error('retries must be greater than 1'));
    }

    function attemptFetch(attempt) {
        return fetch(url, fetchOptions)
            .then(response => {
                if (!response.status === 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.responseText();
            })
            .catch(error => {
                if (attempt < retries) {
                    return attemptFetch(attempt + 1);
                }
                return Promise.reject(new Error(`Failed to fetch after ${retries} attempts: ${error.message}`));
            });
    }

    return attemptFetch(1);
}
