import { Link } from 'react-router-dom';

import { useTaskDetailQuery } from '@/entities/task';

import { ROUTE } from '@/shared';

import { TaskDetailEmptyState } from './task-detail-empty-state';

interface TaskDetailProps {
  id: string;
}

export const TaskDetail = ({ id }: TaskDetailProps) => {
  const { data } = useTaskDetailQuery(id);

  if (!data) {
    return <TaskDetailEmptyState description='요청하신 할 일을 찾을 수 없습니다.' />;
  }

  return (
    <section className='space-y-4'>
      <h1 className='text-content-primary text-xl font-semibold'>할 일 상세</h1>
      <article className='bg-layer-elevated space-y-4 rounded-xl border p-4'>
        <div>
          <p className='text-content-secondary text-sm'>제목</p>
          <p className='text-content-primary mt-1 text-base font-semibold'>{data.title}</p>
        </div>
        <div>
          <p className='text-content-secondary text-sm'>메모</p>
          <p className='text-content-primary mt-1 whitespace-pre-wrap text-base'>{data.memo}</p>
        </div>
        <div>
          <p className='text-content-secondary text-sm'>등록일시</p>
          <p className='text-content-primary mt-1 text-sm'>{data.registerDatetime}</p>
        </div>
      </article>
      <Link
        to={ROUTE.TASK_LIST}
        className='bg-layer-elevated text-content-primary inline-flex rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-layer'
      >
        목록으로 돌아가기
      </Link>
    </section>
  );
};
