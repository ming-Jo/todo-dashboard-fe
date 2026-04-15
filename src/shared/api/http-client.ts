import { ApiError, getErrorMessageFromPayload } from './api-error';

type RequestConfig = Omit<RequestInit, 'body'> & {
  body?: BodyInit | Record<string, unknown> | undefined;
};

type MethodRequestConfig = Omit<RequestConfig, 'method'>;

const parseResponseBody = async (response: Response): Promise<unknown> => {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
};

const normalizeBody = (body: RequestConfig['body']): BodyInit | undefined => {
  if (body === undefined) {
    return undefined;
  }

  if (
    typeof body === 'string' ||
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof Blob ||
    body instanceof ArrayBuffer
  ) {
    return body;
  }

  return JSON.stringify(body);
};

export const httpClient = async <T>(url: string, config?: RequestConfig): Promise<T> => {
  const response = await fetch(url, {
    credentials: 'include',
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config?.headers,
    },
    body: normalizeBody(config?.body),
  });

  const payload = await parseResponseBody(response);
  if (!response.ok) {
    throw new ApiError(
      response.status,
      getErrorMessageFromPayload(payload) ?? response.statusText ?? '요청 처리에 실패했습니다.',
      payload,
    );
  }

  return payload as T;
};

export const api = {
  get: <T>(url: string, config?: MethodRequestConfig): Promise<T> =>
    httpClient<T>(url, { ...config, method: 'GET' }),
  post: <T>(url: string, body?: RequestConfig['body'], config?: MethodRequestConfig): Promise<T> =>
    httpClient<T>(url, { ...config, method: 'POST', body }),
  // NOTE: openapi 기준 PATCH, PUT 메서드 없어서 필요 시 추가 가능
  // put: <T>(
  //   url: string,
  //   body?: RequestConfig['body'],
  //   config?: MethodRequestConfig,
  // ): Promise<T> => httpClient<T>(url, { ...config, method: 'PUT', body }),
  // patch: <T>(
  //   url: string,
  //   body?: RequestConfig['body'],
  //   config?: MethodRequestConfig,
  // ): Promise<T> => httpClient<T>(url, { ...config, method: 'PATCH', body }),
  delete: <T>(url: string, config?: MethodRequestConfig): Promise<T> =>
    httpClient<T>(url, { ...config, method: 'DELETE' }),
};
