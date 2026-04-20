import { useMutation, useQueryClient } from '@tanstack/react-query';

import { signOut } from '../api';

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      signOut();
      // NOTE: 현재는 유지해야할 캐시 데이터가 없어 모든 쿼리 초기화
      queryClient.clear();
    },
  });
};
