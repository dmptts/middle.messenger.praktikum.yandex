const enum RequestMethods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

interface HTTPRequestOptions {
  headers?: Record<string, string>;
  payload?: Record<string, unknown>;
  timeout?: number;
}

export default class HTTPTransport {
  static get(url: string, options: HTTPRequestOptions = {}) {
    return this.request(url, RequestMethods.Get, options);
  }

  static post(url: string, options: HTTPRequestOptions = {}) {
    return this.request(url, RequestMethods.Post, options);
  }

  static put(url: string, options: HTTPRequestOptions = {}) {
    return this.request(url, RequestMethods.Put, options);
  }

  static delete(url: string, options: HTTPRequestOptions = {}) {
    return this.request(url, RequestMethods.Delete, options);
  }

  static request(url: string, method: RequestMethods, options: HTTPRequestOptions = {}) {
    return new Promise((resolve, reject) => {
      const { headers = {}, payload, timeout = 5000 } = options;
      const xhr = new XMLHttpRequest();
      const urlParams = new URLSearchParams();
      const isGet = method === RequestMethods.Get;

      if (isGet && !!payload) {
        Object.entries(payload).forEach(([key, value]) => urlParams.append(key, String(value)));
      }

      xhr.open(
        method,
        urlParams.size
          ? `${url}?${urlParams.toString()}`
          : url,
      );

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

      if (isGet || !payload) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(payload));
      }
    });
  }
}
