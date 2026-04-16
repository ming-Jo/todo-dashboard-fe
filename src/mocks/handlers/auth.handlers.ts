import { delay, http, HttpResponse } from 'msw';

import { MOCK_AUTH } from '../fixtures';

import type { ErrorResponse, SignInRequest } from '@/shared';

const getCookieValue = (cookieHeader: string | null, name: string): string | undefined => {
  if (!cookieHeader) {
    return undefined;
  }

  const cookies = cookieHeader.split(';').map((part) => part.trim());
  for (const cookie of cookies) {
    if (!cookie.startsWith(`${name}=`)) {
      continue;
    }

    return decodeURIComponent(cookie.slice(name.length + 1));
  }

  return undefined;
};

export const authHandlers = [
  http.post('/api/sign-in', async ({ request }) => {
    await delay(200);

    const body = (await request.json()) as Partial<SignInRequest>;
    const isValidUser =
      body.email === MOCK_AUTH.account.email && body.password === MOCK_AUTH.account.password;

    if (!isValidUser) {
      const payload: ErrorResponse = {
        errorMessage: '\uc774\uba54\uc77c \ub610\ub294 \ube44\ubc00\ubc88\ud638\uac00 \uc62c\ubc14\ub974\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.',
      };
      return HttpResponse.json(payload, { status: 400 });
    }

    const refreshCookie = `token=${encodeURIComponent(MOCK_AUTH.token.refreshToken)}; Path=/; SameSite=Lax`;
    return HttpResponse.json(MOCK_AUTH.token, {
      status: 200,
      headers: {
        'Set-Cookie': refreshCookie,
      },
    });
  }),

  http.post('/api/refresh', async ({ request }) => {
    await delay(150);

    if (request.headers.get('x-mock-refresh') === 'fail') {
      const payload: ErrorResponse = {
        errorMessage: '\ud1a0\ud070 \uac15\uc2e0\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.',
      };
      return HttpResponse.json(payload, { status: 400 });
    }

    const refreshToken = getCookieValue(request.headers.get('cookie'), 'token');
    if (!refreshToken || refreshToken !== MOCK_AUTH.token.refreshToken) {
      const payload: ErrorResponse = {
        errorMessage:
          '\uc138\uc158\uc774 \ub9cc\ub8cc\ub418\uc5c8\uac70\ub098 \uc720\ud6a8\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.',
      };
      return HttpResponse.json(payload, { status: 401 });
    }

    return HttpResponse.json(MOCK_AUTH.token, { status: 200 });
  }),
];
