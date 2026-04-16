import type { AuthTokenResponse, SignInRequest } from '@/shared';

export const MOCK_AUTH = {
  account: {
    email: 'test@example.com',
    password: 'Password123',
  } satisfies SignInRequest,
  token: {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
  } satisfies AuthTokenResponse,
} as const;
