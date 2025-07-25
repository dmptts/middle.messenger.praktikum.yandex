const enum RequestMethods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

interface HTTPRequestOptions<T = never> {
  headers?: Record<string, string>;
  payload?: T;
  timeout?: number;
}

export interface ClientErrorDto {
  reason: string;
}

export default class HTTPTransport {
  static #BASE_URL = 'https://ya-praktikum.tech/api/v2';

  static get(url: string, options: HTTPRequestOptions = {}) {
    return this.request(`${(HTTPTransport.#BASE_URL)}${url}`, RequestMethods.Get, options);
  }

  static post<T>(url: string, options: HTTPRequestOptions<T> = {}) {
    return this.request(`${(HTTPTransport.#BASE_URL)}${url}`, RequestMethods.Post, options);
  }

  static put<T>(url: string, options: HTTPRequestOptions<T> = {}) {
    return this.request(`${(HTTPTransport.#BASE_URL)}${url}`, RequestMethods.Put, options);
  }

  static delete(url: string, options: HTTPRequestOptions = {}) {
    return this.request(`${(HTTPTransport.#BASE_URL)}${url}`, RequestMethods.Delete, options);
  }

  static request<T>(url: string, method: RequestMethods, options: HTTPRequestOptions<T> = {}): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const { headers = {}, payload, timeout = 5000 } = options;
      const xhr = new XMLHttpRequest();
      const urlParams = new URLSearchParams();
      const isGet = method === RequestMethods.Get;
      xhr.withCredentials = true;

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
