import { useDashboardQuery } from '@/entities/dashboard';

import { getErrorMessage } from '@/shared';

export const DashboardPage = () => {
  const { data, isPending, isError, error } = useDashboardQuery();

  if (isPending) {
    return (
      <section className='space-y-2'>
        <h1 className='text-content-primary text-xl font-semibold'>대시보드</h1>
        <p className='text-content-secondary text-sm'>대시보드 데이터를 불러오는 중입니다.</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='space-y-2'>
        <h1 className='text-content-primary text-xl font-semibold'>대시보드</h1>
        <p className='text-error text-sm'>{getErrorMessage(error)}</p>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  const cards = [
    {
      label: '일',
      value: data.numOfTask,
    },
    {
      label: '해야할 일',
      value: data.numOfRestTask,
    },
    {
      label: '한 일',
      value: data.numOfDoneTask,
    },
  ];

  return (
    <section className='space-y-4'>
      <h1 className='text-content-primary text-xl font-semibold'>대시보드</h1>
      <div className='grid gap-3 md:grid-cols-3'>
        {cards.map((card) => (
          <article
            key={card.label}
            className='bg-layer-elevated rounded-lg border px-4 py-3'
          >
            <p className='text-content-secondary text-sm'>{card.label}</p>
            <p className='text-content-primary mt-1 text-2xl font-semibold'>{card.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
