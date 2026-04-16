import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type SignInRequest } from '@/shared';

import { signIn } from '../api';

import { AUTH_QUERY_KEY } from './query-keys';

export const useSignInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: SignInRequest) => signIn(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY.profile() });
    },
  });
};
