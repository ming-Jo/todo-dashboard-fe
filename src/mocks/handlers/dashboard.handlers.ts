import { delay, http, HttpResponse } from 'msw';

import { MOCK_DASHBOARD } from '../fixtures';

export const dashboardHandlers = [
  http.get('/api/dashboard', async () => {
    await delay(200);
    return HttpResponse.json(MOCK_DASHBOARD, { status: 200 });
  }),
];
