type ErrorPayload = {
  errorMessage?: string;
};

export class ApiError extends Error {
  public readonly status: number;
  public readonly payload: unknown;

  public constructor(status: number, message: string, payload?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
};

export const getErrorMessageFromPayload = (payload: unknown): string | undefined => {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const { errorMessage } = payload as ErrorPayload;
  return typeof errorMessage === 'string' ? errorMessage : undefined;
};
