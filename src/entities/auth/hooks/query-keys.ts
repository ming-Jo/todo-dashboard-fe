export const AUTH_QUERY_KEY = {
  all: ['auth'] as const,
  profile: () => [...AUTH_QUERY_KEY.all, 'profile'] as const,
};
