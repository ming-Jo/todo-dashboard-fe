import { ROUTE } from '@/shared';

import { saveAuthErrorMessage } from './auth-error-message-store';

export const redirectToSignIn = (message: string): void => {
  if (typeof window === 'undefined') return;

  saveAuthErrorMessage(message);

  if (window.location.pathname !== ROUTE.SIGN_IN) {
    window.location.assign(ROUTE.SIGN_IN);
  }
};
