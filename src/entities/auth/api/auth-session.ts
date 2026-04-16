import { ApiError, isApiError, type UserResponse } from '@/shared';

import { redirectToSignIn } from '../model/auth-navigation';
import { clearAuthTokens, getAccessToken } from '../model/token-store';

import { fetchUserProfileWithToken, refreshSession } from './auth-api';

const withAuthRetry = async <T>(
  request: (accessToken: string) => Promise<T>,
  options?: { skipRetry?: boolean },
): Promise<T> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    const error = new ApiError(401, '로그인이 필요합니다.');
    redirectToSignIn(error.message);
    throw error;
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
      clearAuthTokens();
      redirectToSignIn('세션이 만료되어 다시 로그인해 주세요.');
      throw refreshError;
    }
  }
};

export const fetchUserProfile = (): Promise<UserResponse> =>
  withAuthRetry(fetchUserProfileWithToken);

export const initializeSession = async (): Promise<void> => {
  try {
    await refreshSession();
  } catch {
    clearAuthTokens();
  }
};

export const signOut = (): void => {
  clearAuthTokens();
};
