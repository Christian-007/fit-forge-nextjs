type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export type HttpOptions = {
  headers?: Record<string, string>;
  body?: unknown;
};

export type HttpResponse<T> = {
  ok: boolean;
  status: number;
  statusText: string;
  body?: T;
  error?: string;
};

export function createHttpClient() {
  async function request<T>(
    method: HttpMethod,
    url: string,
    options: HttpOptions = {}
  ): Promise<HttpResponse<T>> {
    try {
      const res = await fetch(`${url}`, {
        method,
        ...(options?.headers && { headers: options.headers }),
        ...(options?.body ? { body: JSON.stringify(options.body) } : {}),
      });

      if (!res.ok) {
        const errResponseBody = await res.json().catch(() => {});
        return {
          ok: false,
          status: res.status,
          statusText: res.statusText,
          error: errResponseBody.message ?? 'Unexpected error happened',
        };
      }

      let responseBody: T | undefined;

      if (res.status !== 204) {
        responseBody = await getResponseBody(res);
      }

      return {
        ok: true,
        status: res.status,
        statusText: res.statusText,
        body: responseBody,
      };
    } catch (err) {
      return {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        error: err instanceof Error ? err.message : 'Unexpected error happened',
      };
    }
  }

  async function getResponseBody(res: Response): Promise<any | undefined> {
    let result: any = {};
    const rawBody = await res.text();
    const hasResponseBody = !!rawBody.trim();

    if (hasResponseBody) {
      try {
        result = JSON.parse(rawBody);
      } catch (_) {
        result = {};
      }
    }

    return result;
  }

  return {
    get: <T>(url: string, options?: HttpOptions) => request<T>('GET', url, options),
    post: <T>(url: string, body: unknown, options?: HttpOptions) =>
      request<T>('POST', url, { ...options, body }),
    patch: <T>(url: string, body: unknown, options?: HttpOptions) =>
      request<T>('PATCH', url, { ...options, body }),
    delete: <T>(url: string, options?: HttpOptions) => request<T>('DELETE', url, options),
    put: <T>(url: string, body: unknown, options?: HttpOptions) =>
      request<T>('PUT', url, { ...options, body }),
  };
}
