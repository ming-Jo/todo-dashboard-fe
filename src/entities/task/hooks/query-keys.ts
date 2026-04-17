export const TASK_QUERY_KEY = {
  all: ['task'] as const,
  list: () => [...TASK_QUERY_KEY.all, 'list'] as const,
  detail: (id: string) => [...TASK_QUERY_KEY.all, 'detail', id] as const,
};
