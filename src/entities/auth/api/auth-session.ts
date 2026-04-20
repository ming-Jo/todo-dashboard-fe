import { type UserResponse } from '@/shared';

import {
  authError,
  clearAuthTokens,
  getAccessToken,
  redirectToSignInAndThrow,
} from '../model';

import { fetchUserProfileWithToken, refreshSession } from './auth-api';

type AuthorizedRequest<T> = (accessToken: string) => Promise<T>;

const runWithRefreshedSession = async <T>(
  request: AuthorizedRequest<T>,
  expiredMessage: string,
): Promise<T> => {
  try {
    const nextTokens = await refreshSession();
    return await request(nextTokens.accessToken);
  } catch (refreshError) {
    if (authError.isSessionExpired(refreshError)) {
      redirectToSignInAndThrow(expiredMessage);
    }

    throw refreshError;
  }
};

export const requestWithAuthRetry = async <T>(request: AuthorizedRequest<T>): Promise<T> => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return runWithRefreshedSession(request, '로그인이 필요합니다.');
  }

  try {
    return await request(accessToken);
  } catch (error) {
    if (!authError.isUnauthorized(error)) {
      throw error;
    }

    return runWithRefreshedSession(request, '세션이 만료되어 다시 로그인해 주세요.');
  }
};

export const fetchUserProfile = (): Promise<UserResponse> =>
  requestWithAuthRetry(fetchUserProfileWithToken);

export const initializeSession = async (): Promise<void> => {
  try {
    await refreshSession();
  } catch (error) {
    if (authError.isSessionExpired(error)) {
      clearAuthTokens();
    }
  }
};

export const signOut = (): void => {
  const enableMsw = import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === 'true';
  if (enableMsw && typeof document !== 'undefined') {
    document.cookie = 'token=; Path=/; Max-Age=0; SameSite=Lax';
  }

  clearAuthTokens();
};
