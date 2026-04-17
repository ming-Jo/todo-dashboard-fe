import { beforeEach, describe, expect, it, vi } from 'vitest';

import { api } from '@/shared';

import { refreshSession } from './auth-api';

vi.mock('@/shared', async () => {
  const actual = await vi.importActual<typeof import('@/shared')>('@/shared');
  return {
    ...actual,
    api: {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
    },
  };
});

describe('auth-api refreshSession', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('동시에 2번 호출해도 내부 /api/refresh 호출은 1회만 발생하는지 확인', async () => {
    const postMock = vi.mocked(api.post);
    postMock.mockImplementation(
      async () =>
        await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                accessToken: 'new-access-token',
                refreshToken: 'new-refresh-token',
              }),
            20,
          ),
        ),
    );

    const [first, second] = await Promise.all([refreshSession(), refreshSession()]);

    expect(postMock).toHaveBeenCalledTimes(1);
    expect(first.accessToken).toBe('new-access-token');
    expect(second.refreshToken).toBe('new-refresh-token');
  });
});
