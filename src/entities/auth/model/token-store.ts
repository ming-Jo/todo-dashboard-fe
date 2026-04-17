import { useSyncExternalStore } from 'react';

import type { AuthTokens } from './types';

let currentTokens: AuthTokens | null = null;
const listeners = new Set<() => void>();

const notifyTokenChange = (): void => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getAuthTokens = (): AuthTokens | null => currentTokens;

export const setAuthTokens = (tokens: AuthTokens): void => {
  currentTokens = tokens;
  notifyTokenChange();
};

export const clearAuthTokens = (): void => {
  currentTokens = null;
  notifyTokenChange();
};

export const getAccessToken = (): string | null => currentTokens?.accessToken ?? null;

export const useAuthTokens = (): AuthTokens | null =>
  useSyncExternalStore(subscribe, getAuthTokens, getAuthTokens);

export const useHasAccessToken = (): boolean => Boolean(useAuthTokens()?.accessToken);
