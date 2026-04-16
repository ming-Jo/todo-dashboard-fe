import type { AuthTokens } from './types';

let currentTokens: AuthTokens | null = null;

export const getAuthTokens = (): AuthTokens | null => currentTokens;

export const setAuthTokens = (tokens: AuthTokens): void => {
  currentTokens = tokens;
};

export const clearAuthTokens = (): void => {
  currentTokens = null;
};

export const getAccessToken = (): string | null => currentTokens?.accessToken ?? null;
