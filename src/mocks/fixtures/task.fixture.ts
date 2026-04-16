import type { TaskDetailResponse, TaskItem } from '@/shared';

const createTasks = (count: number): TaskItem[] => {
  return Array.from({ length: count }).map((_, index) => {
    const id = String(index + 1);
    const isDone = index % 3 === 0;

    return {
      id,
      title: `할 일 ${id}`,
      memo: `할 일 ${id} 메모`,
      status: isDone ? 'DONE' : 'TODO',
    };
  });
};

const TASK_ITEMS = createTasks(80);

export const MOCK_TASK = {
  pageSize: 20,
  items: TASK_ITEMS,
  detailMap: TASK_ITEMS.reduce<Record<string, TaskDetailResponse>>((acc, item) => {
    acc[item.id] = {
      title: item.title,
      memo: `${item.memo} 상세`,
      registerDatetime: '2026-04-14T09:00:00.000Z',
    };

    return acc;
  }, {}),
} as const;
