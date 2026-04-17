import { Suspense } from 'react';

import { TaskList } from '@/widgets/task';

import { PageFallback } from '@/shared';

export const TaskListPage = () => (
  <Suspense
    fallback={
      <PageFallback
        title='할 일 목록'
        description='할 일 목록을 불러오는 중입니다.'
      />
    }
  >
    <TaskList />
  </Suspense>
);
