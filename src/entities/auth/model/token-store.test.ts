import { beforeEach, describe, expect, it } from 'vitest';

import { clearAuthTokens, getAccessToken, getAuthTokens, setAuthTokens } from './token-store';

describe('token-store', () => {
  beforeEach(() => {
    clearAuthTokens();
  });

  it('토큰 저장 및 조회', () => {
    const tokens = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    };

    setAuthTokens(tokens);

    expect(getAuthTokens()).toEqual(tokens);
    expect(getAccessToken()).toBe('access-token');
  });

  it('토큰 초기화', () => {
    setAuthTokens({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });

    clearAuthTokens();

    expect(getAuthTokens()).toBeNull();
    expect(getAccessToken()).toBeNull();
  });
});
