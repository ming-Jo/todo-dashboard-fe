import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import { TaskDetail, TaskDetailEmptyState } from '@/widgets/task-detail';

import { PageFallback } from '@/shared';

export const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <TaskDetailEmptyState description='유효하지 않은 접근입니다.' />;
  }

  return (
    <Suspense
      fallback={
        <PageFallback
          title='할 일 상세'
          description='상세 정보를 불러오는 중입니다.'
        />
      }
    >
      <TaskDetail id={id} />
    </Suspense>
  );
};
