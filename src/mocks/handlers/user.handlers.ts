import { delay, http, HttpResponse } from 'msw';

import { MOCK_USER } from '../fixtures';

export const userHandlers = [
  http.get('/api/user', async () => {
    await delay(200);
    return HttpResponse.json(MOCK_USER, { status: 200 });
  }),
];
