import { delay, http, HttpResponse } from 'msw';

import { MOCK_TASK } from '../fixtures';

import type {
  DeleteTaskResponse,
  ErrorResponse,
  TaskDetailResponse,
  TaskListResponse,
} from '@/shared';

const getPageNumber = (url: URL): number => {
  const page = Number(url.searchParams.get('page') ?? '1');
  return Number.isNaN(page) || page < 1 ? 1 : page;
};

export const taskHandlers = [
  http.get('/api/task', async ({ request }) => {
    await delay(250);

    const page = getPageNumber(new URL(request.url));
    const start = (page - 1) * MOCK_TASK.pageSize;
    const end = start + MOCK_TASK.pageSize;

    const data = MOCK_TASK.items.slice(start, end);
    const hasNext = end < MOCK_TASK.items.length;

    const payload: TaskListResponse = { data, hasNext };
    return HttpResponse.json(payload, { status: 200 });
  }),

  http.get('/api/task/:id', async ({ params }) => {
    await delay(200);

    const id = params.id as string;
    const detail = MOCK_TASK.detailMap[id];

    if (!detail) {
      const payload: ErrorResponse = { errorMessage: '리소스를 찾을 수 없습니다.' };
      return HttpResponse.json(payload, { status: 404 });
    }

    const payload: TaskDetailResponse = detail;
    return HttpResponse.json(payload, { status: 200 });
  }),

  http.delete('/api/task/:id', async ({ params }) => {
    await delay(150);

    const id = params.id as string;
    const exists = MOCK_TASK.items.some((item) => item.id === id);
    if (!exists) {
      const payload: ErrorResponse = { errorMessage: '리소스를 찾을 수 없습니다.' };
      return HttpResponse.json(payload, { status: 404 });
    }

    const payload: DeleteTaskResponse = { success: true };
    return HttpResponse.json(payload, { status: 200 });
  }),
];
