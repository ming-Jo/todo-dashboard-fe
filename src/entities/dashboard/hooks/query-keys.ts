export const DASHBOARD_QUERY_KEY = {
  all: ['dashboard'] as const,
  metrics: () => [...DASHBOARD_QUERY_KEY.all, 'metrics'] as const,
};
