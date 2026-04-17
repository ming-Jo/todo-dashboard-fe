import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTask } from '../api';

import { TASK_QUERY_KEY } from './query-keys';

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: async (_, id) => {
      queryClient.removeQueries({ queryKey: TASK_QUERY_KEY.detail(id) });
      await queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEY.list() });
    },
  });
};
