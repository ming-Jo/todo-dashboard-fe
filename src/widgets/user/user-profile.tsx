import { useSuspenseUserProfileQuery } from '@/entities/auth';

export const UserProfile = () => {
  const { data } = useSuspenseUserProfileQuery();

  return (
    <section className='space-y-4'>
      <h1 className='text-content-primary text-xl font-semibold'>회원정보</h1>
      <article className='bg-layer-elevated space-y-3 rounded-lg border p-4'>
        <div>
          <p className='text-content-secondary text-sm'>이름</p>
          <p className='text-content-primary mt-1 text-base font-medium'>{data.name}</p>
        </div>
        <div>
          <p className='text-content-secondary text-sm'>메모</p>
          <p className='text-content-primary mt-1 whitespace-pre-wrap text-base'>{data.memo}</p>
        </div>
      </article>
    </section>
  );
};
