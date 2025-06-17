import { HttpResponse } from './http-client';

export interface ParseJsonResult<T> {
  ok: boolean;
  body?: T;
  error?: string;
}

export async function safeJsonParse<T>(request: Request): Promise<ParseJsonResult<T>> {
  try {
    const body = await request.json();

    if (typeof body !== 'object' || body === null || Object.keys(body).length === 0) {
      return {
        ok: false,
        error: 'Empty or invalid JSON body',
      };
    }

    return {
      ok: true,
      body: body as T,
    };
  } catch (error) {
    return {
      ok: false,
      error: 'Invalid JSON format',
    };
  }
}

export async function safeFetchJson<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<HttpResponse<T>> {
  try {
    const res = await fetch(input, init);
    if (!res.ok) {
      const errResponseBody = await res.json().catch(() => {});
      return {
        ok: false,
        status: res.status,
        statusText: res.statusText,
        error: errResponseBody.message ?? 'Unexpected error happened',
      };
    }

    let body: T | undefined;

    if (res.status !== 204) {
      body = await res.json();
    }

    return {
      ok: true,
      status: res.status,
      statusText: res.statusText,
      body,
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
