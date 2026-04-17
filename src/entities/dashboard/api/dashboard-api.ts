import { requestWithAuthRetry } from '@/entities/auth';

import { api, type DashboardResponse } from '@/shared';

const fetchDashboardWithToken = (accessToken: string): Promise<DashboardResponse> =>
  api.get<DashboardResponse>('/api/dashboard', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const fetchDashboard = (): Promise<DashboardResponse> =>
  requestWithAuthRetry((accessToken) => fetchDashboardWithToken(accessToken));
