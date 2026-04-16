import { useMutation, useQueryClient } from '@tanstack/react-query';

import { signOut } from '../api';

import { AUTH_QUERY_KEY } from './query-keys';

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      signOut();
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY.all });
    },
  });
};
