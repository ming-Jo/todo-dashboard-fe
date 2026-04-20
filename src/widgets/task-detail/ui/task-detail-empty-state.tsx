import { Link } from 'react-router-dom';

import { ROUTE } from '@/shared';

interface TaskDetailEmptyStateProps {
  description: string;
}

export const TaskDetailEmptyState = ({ description }: TaskDetailEmptyStateProps) => (
  <section className='space-y-4'>
    <h1 className='text-content-primary text-xl font-semibold'>할 일 상세</h1>
    <p className='text-content-secondary text-sm'>{description}</p>
    <Link
      to={ROUTE.TASK_LIST}
      className='bg-layer-elevated text-content-primary hover:bg-layer inline-flex rounded-md border px-3 py-2 text-sm font-medium transition'
    >
      목록으로 돌아가기
    </Link>
  </section>
);
