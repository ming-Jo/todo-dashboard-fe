import { delay, http, HttpResponse } from 'msw';

import { MOCK_AUTH } from '../fixtures';

import type { ErrorResponse, SignInRequest } from '@/shared';

export const authHandlers = [
  http.post('/api/sign-in', async ({ request }) => {
    await delay(200);

    const body = (await request.json()) as Partial<SignInRequest>;
    const isValidUser =
      body.email === MOCK_AUTH.account.email && body.password === MOCK_AUTH.account.password;

    if (!isValidUser) {
      const payload: ErrorResponse = { errorMessage: '이메일 또는 비밀번호가 올바르지 않습니다.' };
      return HttpResponse.json(payload, { status: 400 });
    }

    return HttpResponse.json(MOCK_AUTH.token, { status: 200 });
  }),

  http.post('/api/refresh', async () => {
    await delay(150);
    return HttpResponse.json(MOCK_AUTH.token, { status: 200 });
  }),
];
