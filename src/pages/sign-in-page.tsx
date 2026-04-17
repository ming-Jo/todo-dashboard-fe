import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { takeAuthErrorMessage, useSignInMutation } from '@/entities/auth';

import { getErrorMessage, type SignInRequest } from '@/shared';
import { ROUTE } from '@/shared';

export const SignInPage = () => {
  const navigate = useNavigate();
  const signInMutation = useSignInMutation();

  const [authMessage] = useState<string | null>(() => takeAuthErrorMessage());
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInRequest>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signInMutation.mutateAsync(values);
      navigate(ROUTE.DASHBOARD);
    } catch (error) {
      setModalMessage(getErrorMessage(error));
    }
  });

  return (
    <>
      <section className='mx-auto w-full max-w-md space-y-4'>
        <div className='space-y-1'>
          <h1 className='text-content-primary text-2xl font-semibold'>로그인</h1>
          <p className='text-content-secondary text-sm'>이메일과 비밀번호를 입력해 주세요.</p>
        </div>

        {authMessage && (
          <p className='text-error bg-error/10 border-error/20 rounded-md border px-3 py-2 text-sm'>
            {authMessage}
          </p>
        )}

        <form
          className='space-y-4'
          onSubmit={onSubmit}
          noValidate
        >
          <div className='space-y-1'>
            <label
              htmlFor='email'
              className='text-content-primary block text-sm font-medium'
            >
              이메일
            </label>
            <input
              id='email'
              type='email'
              className='bg-layer focus-visible:ring-focus-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2'
              aria-invalid={Boolean(errors.email)}
              {...register('email', {
                required: '이메일은 필수입니다.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
            />
            {errors.email ? <p className='text-error text-xs'>{errors.email.message}</p> : null}
          </div>

          <div className='space-y-1'>
            <label
              htmlFor='password'
              className='text-content-primary block text-sm font-medium'
            >
              비밀번호
            </label>
            <input
              id='password'
              type='password'
              className='bg-layer focus-visible:ring-focus-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2'
              aria-invalid={Boolean(errors.password)}
              {...register('password', {
                required: '비밀번호는 필수입니다.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 8자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 24,
                  message: '비밀번호는 24자 이하여야 합니다.',
                },
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message: '비밀번호는 영문과 숫자만 사용할 수 있습니다.',
                },
              })}
            />
            {errors.password && <p className='text-error text-xs'>{errors.password.message}</p>}
          </div>

          <button
            type='submit'
            disabled={!isValid || signInMutation.isPending}
            className='bg-primary text-primary-foreground disabled:bg-disabled disabled:text-disabled-foreground w-full cursor-pointer rounded-md px-4 py-2 text-sm font-medium disabled:cursor-not-allowed'
          >
            {signInMutation.isPending ? '로그인 중...' : '제출'}
          </button>
        </form>
      </section>

      {modalMessage && (
        <div className='bg-layer-overlay fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            role='dialog'
            aria-modal='true'
            aria-label='로그인 오류'
            className='bg-layer w-full max-w-sm rounded-lg border p-5'
          >
            <h2 className='text-content-primary text-base font-semibold'>로그인 실패</h2>
            <p className='text-content-secondary mt-2 text-sm'>{modalMessage}</p>
            <button
              type='button'
              className='bg-primary text-primary-foreground mt-4 w-full rounded-md px-3 py-2 text-sm font-medium'
              onClick={() => setModalMessage(null)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};
