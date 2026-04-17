import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchDashboard } from '../api';

import { DASHBOARD_QUERY_KEY } from './query-keys';

export const useDashboardQuery = () =>
  useSuspenseQuery({
    queryKey: DASHBOARD_QUERY_KEY.metrics(),
    queryFn: fetchDashboard,
  });
