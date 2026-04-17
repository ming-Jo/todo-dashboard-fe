import { delay, http, HttpResponse } from 'msw';

import { MOCK_DASHBOARD } from '../fixtures';

import type { DashboardResponse } from '@/shared';

export const dashboardHandlers = [
  http.get('/api/dashboard', async () => {
    await delay(200);
    const payload: DashboardResponse = MOCK_DASHBOARD;
    return HttpResponse.json(payload, { status: 200 });
  }),
];
