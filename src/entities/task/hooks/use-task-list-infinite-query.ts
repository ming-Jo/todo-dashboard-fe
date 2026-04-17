import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { fetchTaskList } from '../api';
import { mapTaskListPage } from '../model';

import { TASK_QUERY_KEY } from './query-keys';

const FIRST_PAGE = 1;

export const useTaskListInfiniteQuery = () =>
  useSuspenseInfiniteQuery({
    queryKey: TASK_QUERY_KEY.list(),
    queryFn: async ({ pageParam }) => {
      const response = await fetchTaskList(pageParam);
      return mapTaskListPage(response, pageParam);
    },
    initialPageParam: FIRST_PAGE,
    getNextPageParam: (lastPage, allPages) => (lastPage.hasNext ? allPages.length + 1 : undefined),
  });
