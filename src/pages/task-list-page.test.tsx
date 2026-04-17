import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ROUTE, type TaskListResponse, type TaskStatus } from '@/shared';

import { TaskListPage } from './task-list-page';
import { renderWithProviders } from '@/test/render-with-providers';

type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];

  private readonly callback: IntersectionCallback;

  constructor(callback: IntersectionCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  disconnect(): void {}

  observe(): void {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(): void {}

  trigger(isIntersecting: boolean): void {
    this.callback([{ isIntersecting } as IntersectionObserverEntry]);
  }
}

const taskMocks = vi.hoisted(() => ({
  useTaskListInfiniteQuery: vi.fn(),
}));

vi.mock('@/entities/task', async () => {
  const actual = await vi.importActual<typeof import('@/entities/task')>('@/entities/task');
  return {
    ...actual,
    useTaskListInfiniteQuery: taskMocks.useTaskListInfiniteQuery,
  };
});

const createTask = (id: string, status: TaskStatus = 'TODO') => ({
  id,
  title: `할 일 ${id}`,
  memo: `할 일 ${id} 메모`,
  status,
});

const createPage = (ids: string[]): TaskListResponse => ({
  data: ids.map((id, index) => createTask(id, index % 2 === 0 ? 'TODO' : 'DONE')),
  hasNext: false,
});

describe('TaskListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    MockIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    taskMocks.useTaskListInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            page: 1,
            hasNext: false,
            items: createPage(['1', '2', '3']).data,
          },
        ],
        pageParams: [1],
      },
      hasNextPage: false,
      isFetching: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
    });
  });

  it('초기 목록을 렌더링한다', async () => {
    renderWithProviders(<TaskListPage />, { route: ROUTE.TASK_LIST, path: ROUTE.TASK_LIST });

    expect(await screen.findByText('할 일 1')).toBeInTheDocument();
    expect(screen.getByText('할 일 2')).toBeInTheDocument();
    expect(screen.getByText('할 일 3')).toBeInTheDocument();
  });

  it('다음 페이지 트리거 조건에서 fetchNextPage를 호출한다', async () => {
    const fetchNextPage = vi.fn().mockResolvedValue(undefined);
    taskMocks.useTaskListInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            page: 1,
            hasNext: true,
            items: createPage(['1', '2']).data,
          },
        ],
        pageParams: [1],
      },
      hasNextPage: true,
      isFetching: false,
      isFetchingNextPage: false,
      fetchNextPage,
    });

    renderWithProviders(<TaskListPage />, { route: ROUTE.TASK_LIST, path: ROUTE.TASK_LIST });

    const observer = MockIntersectionObserver.instances[0];
    expect(observer).toBeDefined();

    observer.trigger(true);
    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('카드에 title, memo와 상세 이동 링크를 렌더링한다', async () => {
    renderWithProviders(<TaskListPage />, { route: ROUTE.TASK_LIST, path: ROUTE.TASK_LIST });

    expect(await screen.findByText('할 일 1 메모')).toBeInTheDocument();
    const detailLink = screen.getByRole('link', { name: /할 일 1\s*할 일 1 메모/i });
    expect(detailLink).toHaveAttribute('href', '/task/1');
  });
});
