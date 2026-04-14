import { useParams } from 'react-router-dom';

export const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <section className='space-y-2'>
      <h1 className='text-content-primary text-xl font-semibold'>할 일 상세</h1>
      <p className='text-content-secondary text-sm'>현재 id: {id}</p>
      <p className='text-content-secondary text-sm'>`/api/task/:id` 연동 전 임시 레이아웃입니다.</p>
    </section>
  );
};
