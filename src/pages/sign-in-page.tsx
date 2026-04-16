import { useState } from 'react';

import { takeAuthErrorMessage } from '@/entities/auth';

export const SignInPage = () => {
  const [authMessage] = useState<string | null>(() => takeAuthErrorMessage());

  return (
    <section className='space-y-2'>
      <h1 className='text-content-primary text-xl font-semibold'>로그인</h1>
      <p className='text-content-secondary text-sm'>`/api/sign-in` 연동 전 임시 레이아웃입니다.</p>
      {authMessage ? (
        <p className='text-error bg-error/10 border-error/20 rounded-md border px-3 py-2 text-sm'>
          {authMessage}
        </p>
      ) : null}
    </section>
  );
};
