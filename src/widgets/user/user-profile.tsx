import { useNavigate } from 'react-router-dom';

import { useSignOutMutation, useSuspenseUserProfileQuery } from '@/entities/auth';

import { ROUTE } from '@/shared';

export const UserProfile = () => {
  const navigate = useNavigate();

  const { mutateAsync: signOut, isPending: isPendingSignOut } = useSignOutMutation();
  const { data: userProfile } = useSuspenseUserProfileQuery();

  const { name, memo } = userProfile ?? {};

  const handleSignOut = async (): Promise<void> => {
    await signOut();
    navigate(ROUTE.SIGN_IN);
  };

  return (
    <section className='space-y-4'>
      <div className='flex items-center justify-between gap-3'>
        <h1 className='text-content-primary text-xl font-semibold'>회원정보</h1>

        {/* NOTE: 재로그인 테스트를 위해 로그아웃 버튼을 추가했습니다. */}
        <button
          type='button'
          onClick={handleSignOut}
          disabled={isPendingSignOut}
          className='border-error/40 text-error hover:bg-error/10 disabled:text-disabled-foreground disabled:border-disabled cursor-pointer rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed'
        >
          {isPendingSignOut ? '로그아웃 중...' : '로그아웃'}
        </button>
      </div>
      <article className='bg-layer-elevated space-y-3 rounded-lg border p-4'>
        <div>
          <p className='text-content-secondary text-sm'>이름</p>
          <p className='text-content-primary mt-1 text-base font-medium'>{name}</p>
        </div>
        <div>
          <p className='text-content-secondary text-sm'>메모</p>
          <p className='text-content-primary mt-1 text-base whitespace-pre-wrap'>{memo}</p>
        </div>
      </article>
    </section>
  );
};
