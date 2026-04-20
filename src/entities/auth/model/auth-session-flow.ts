import { isApiError } from '@/shared';

import { redirectToSignIn } from './auth-navigation';
import { clearAuthTokens } from './token-store';

const AUTH_REDIRECT_ERROR_NAME = 'AuthRedirectError';

export const authError = {
  isUnauthorized: (error: unknown): boolean => isApiError(error) && error.status === 401,
  isSessionExpired: (error: unknown): boolean =>
    authError.isUnauthorized(error) || (isApiError(error) && error.status === 403),
  isRedirect: (error: unknown): boolean =>
    error instanceof Error && error.name === AUTH_REDIRECT_ERROR_NAME,
};

export const redirectToSignInAndThrow = (message: string): never => {
  clearAuthTokens();
  redirectToSignIn(message);

  const error = new Error('AUTH_REDIRECT_IN_PROGRESS');
  error.name = AUTH_REDIRECT_ERROR_NAME;
  throw error;
};
