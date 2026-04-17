import type { AuthTokenResponse, SignInRequest } from '@/shared';

export const MOCK_AUTH = {
  account: {
    email: 'qa-login@example.test',
    password: 'QATestPass123',
  } satisfies SignInRequest,
  token: {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
  } satisfies AuthTokenResponse,
} as const;
