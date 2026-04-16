import { delay, http, HttpResponse } from 'msw';

import { MOCK_AUTH, MOCK_USER } from '../fixtures';

import type { ErrorResponse } from '@/shared';

export const userHandlers = [
  http.get('/api/user', async ({ request }) => {
    await delay(200);

    const authorization = request.headers.get('authorization') ?? '';
    const expected = `Bearer ${MOCK_AUTH.token.accessToken}`;
    if (authorization !== expected) {
      const payload: ErrorResponse = {
        errorMessage: '\uc778\uc99d\uc774 \ud544\uc694\ud569\ub2c8\ub2e4.',
      };
      return HttpResponse.json(payload, { status: 401 });
    }

    return HttpResponse.json(MOCK_USER, { status: 200 });
  }),
];
