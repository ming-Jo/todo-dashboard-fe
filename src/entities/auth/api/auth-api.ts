import { api, type AuthTokenResponse, type SignInRequest, type UserResponse } from '@/shared';

import { setAuthTokens } from '../model';

let refreshPromise: Promise<AuthTokenResponse> | null = null;

/**
 * msw 환경에서 쿠키를 동기화하기 위한 함수
 */
const syncMockRefreshCookie = (refreshToken: string): void => {
  if (!import.meta.env.DEV || typeof document === 'undefined') {
    return;
  }

  document.cookie = `token=${encodeURIComponent(refreshToken)}; Path=/; SameSite=Lax`;
};

export const signIn = (body: SignInRequest): Promise<AuthTokenResponse> =>
  api.post<AuthTokenResponse>('/api/sign-in', body).then((tokens) => {
    syncMockRefreshCookie(tokens.refreshToken);
    setAuthTokens(tokens);
    return tokens;
  });

export const refreshSession = (): Promise<AuthTokenResponse> => {
  if (!refreshPromise) {
    refreshPromise = api
      .post<AuthTokenResponse>('/api/refresh')
      .then((tokens) => {
        syncMockRefreshCookie(tokens.refreshToken);
        setAuthTokens(tokens);
        return tokens;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

export const fetchUserProfileWithToken = (accessToken: string): Promise<UserResponse> =>
  api.get<UserResponse>('/api/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
