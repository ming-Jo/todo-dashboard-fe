import { api, type AuthTokenResponse, type SignInRequest, type UserResponse } from '@/shared';

import { setAuthTokens } from '../model';

let refreshPromise: Promise<AuthTokenResponse> | null = null;

export const signIn = (body: SignInRequest): Promise<AuthTokenResponse> =>
  api.post<AuthTokenResponse>('/api/sign-in', body).then((tokens) => {
    setAuthTokens(tokens);
    return tokens;
  });

export const refreshSession = (): Promise<AuthTokenResponse> => {
  if (!refreshPromise) {
    refreshPromise = api
      .post<AuthTokenResponse>('/api/refresh')
      .then((tokens) => {
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
