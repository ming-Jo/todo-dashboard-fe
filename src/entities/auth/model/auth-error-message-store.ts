const AUTH_ERROR_MESSAGE_KEY = 'auth_error_message';

export const saveAuthErrorMessage = (message: string): void => {
  if (typeof window === 'undefined') return;

  window.sessionStorage.setItem(AUTH_ERROR_MESSAGE_KEY, message);
};

export const takeAuthErrorMessage = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const message = window.sessionStorage.getItem(AUTH_ERROR_MESSAGE_KEY);
  if (!message) {
    return null;
  }

  window.sessionStorage.removeItem(AUTH_ERROR_MESSAGE_KEY);

  return message;
};
