import { useSuspenseQuery } from '@tanstack/react-query';

import { isApiError, type TaskDetailResponse } from '@/shared';

import { fetchTaskDetail } from '../api';

import { TASK_QUERY_KEY } from './query-keys';

export const useTaskDetailQuery = (id: string) =>
  useSuspenseQuery<TaskDetailResponse | null>({
    queryKey: TASK_QUERY_KEY.detail(id),
    queryFn: async () => {
      try {
        return await fetchTaskDetail(id);
      } catch (error) {
        if (isApiError(error) && error.status === 404) {
          return null;
        }

        throw error;
      }
    },
  });
