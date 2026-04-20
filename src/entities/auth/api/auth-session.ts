import { ApiError, isApiError, type UserResponse } from '@/shared';

import { clearAuthTokens, getAccessToken, redirectToSignIn } from '../model';

import { fetchUserProfileWithToken, refreshSession } from './auth-api';

const isSessionExpiredError = (error: unknown): boolean =>
  isApiError(error) && (error.status === 401 || error.status === 403);

export const requestWithAuthRetry = async <T>(
  request: (accessToken: string) => Promise<T>,
  options?: { skipRetry?: boolean },
): Promise<T> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    if (options?.skipRetry) {
      const error = new ApiError(401, '로그인이 필요합니다.');
      redirectToSignIn(error.message);
      throw error;
    }

    try {
      const nextTokens = await refreshSession();
      return await request(nextTokens.accessToken);
    } catch (refreshError) {
      if (isSessionExpiredError(refreshError)) {
        clearAuthTokens();
        redirectToSignIn('로그인이 필요합니다.');
      }

      throw refreshError;
    }
  }

  try {
    return await request(accessToken);
  } catch (error) {
    if (options?.skipRetry || !isApiError(error) || error.status !== 401) {
      throw error;
    }

    try {
      const nextTokens = await refreshSession();
      return await request(nextTokens.accessToken);
    } catch (refreshError) {
      if (isSessionExpiredError(refreshError)) {
        clearAuthTokens();
        redirectToSignIn('세션이 만료되어 다시 로그인해 주세요.');
      }

      throw refreshError;
    }
  }
};

export const fetchUserProfile = (): Promise<UserResponse> =>
  requestWithAuthRetry(fetchUserProfileWithToken);

export const initializeSession = async (): Promise<void> => {
  try {
    await refreshSession();
  } catch (error) {
    if (isSessionExpiredError(error)) {
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
