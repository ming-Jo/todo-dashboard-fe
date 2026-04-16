import type { AuthTokenResponse, SignInRequest } from '@/shared';

export type AuthTokens = AuthTokenResponse;
export type SignInCredentials = SignInRequest;

export type AuthStatus =
  | 'anonymous'
  | 'authenticating'
  | 'authenticated'
  | 'refreshing'
  | 'expired';

export type AuthState =
  | {
      status: 'anonymous' | 'authenticating';
      tokens: null;
    }
  | {
      status: 'authenticated' | 'refreshing';
      tokens: AuthTokens;
    }
  | {
      status: 'expired';
      tokens: null;
      reason: 'token-expired' | 'unauthorized';
    };
