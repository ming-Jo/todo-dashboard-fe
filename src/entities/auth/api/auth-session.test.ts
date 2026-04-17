import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiError } from '@/shared';

import { fetchUserProfile, initializeSession } from './auth-session';

const mocks = vi.hoisted(() => ({
  redirectToSignIn: vi.fn(),
  clearAuthTokens: vi.fn(),
  getAccessToken: vi.fn(),
  fetchUserProfileWithToken: vi.fn(),
  refreshSession: vi.fn(),
}));

vi.mock('../model/auth-navigation', () => ({
  redirectToSignIn: mocks.redirectToSignIn,
}));

vi.mock('../model/token-store', () => ({
  clearAuthTokens: mocks.clearAuthTokens,
  getAccessToken: mocks.getAccessToken,
}));

vi.mock('./auth-api', () => ({
  fetchUserProfileWithToken: mocks.fetchUserProfileWithToken,
  refreshSession: mocks.refreshSession,
}));

describe('auth-session', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('accessToken이 없으면 로그인 페이지로 리다이렉트', async () => {
    mocks.getAccessToken.mockReturnValue(null);

    await expect(fetchUserProfile()).rejects.toBeInstanceOf(ApiError);
    expect(mocks.redirectToSignIn).toHaveBeenCalledWith('로그인이 필요합니다.');
  });

  it('401 에러 발생 시 세션 갱신 후 재시도', async () => {
    mocks.getAccessToken.mockReturnValue('expired-access-token');
    mocks.fetchUserProfileWithToken
      .mockRejectedValueOnce(new ApiError(401, 'Unauthorized'))
      .mockResolvedValueOnce({ name: '홍길동', memo: 'memo' });
    mocks.refreshSession.mockResolvedValue({
      accessToken: 'renewed-token',
      refreshToken: 'refresh-token',
    });

    const profile = await fetchUserProfile();

    expect(mocks.refreshSession).toHaveBeenCalledTimes(1);
    expect(mocks.fetchUserProfileWithToken).toHaveBeenNthCalledWith(2, 'renewed-token');
    expect(profile).toEqual({ name: '홍길동', memo: 'memo' });
  });

  it('세션 갱신 실패 시 토큰 초기화 후 로그인 페이지로 리다이렉트', async () => {
    mocks.getAccessToken.mockReturnValue('expired-access-token');
    mocks.fetchUserProfileWithToken.mockRejectedValue(new ApiError(401, 'Unauthorized'));
    mocks.refreshSession.mockRejectedValue(new ApiError(401, 'Refresh Unauthorized'));

    await expect(fetchUserProfile()).rejects.toBeInstanceOf(ApiError);
    expect(mocks.clearAuthTokens).toHaveBeenCalledTimes(1);
    expect(mocks.redirectToSignIn).toHaveBeenCalledWith('세션이 만료되어 다시 로그인해 주세요.');
  });

  it('initializeSession 호출 후 세션 갱신 실패 시 토큰 초기화', async () => {
    mocks.refreshSession.mockRejectedValue(new ApiError(401, 'Refresh Unauthorized'));

    await initializeSession();

    expect(mocks.clearAuthTokens).toHaveBeenCalledTimes(1);
  });
});
