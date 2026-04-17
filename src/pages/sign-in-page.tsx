import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { SignInErrorModal } from '@/widgets/sign-in';

import { takeAuthErrorMessage, useSignInMutation } from '@/entities/auth';

import { getErrorMessage, ROUTE, type SignInRequest, useModal } from '@/shared';

export const SignInPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: signInMutate, isPending: isPendingSignIn } = useSignInMutation();

  const [authMessage] = useState<string | null>(() => takeAuthErrorMessage());
  const [modalMessage, setModalMessage] = useState('');
  const {
    isOpen: isErrorModalOpen,
    openModal: openErrorModal,
    closeModal: closeErrorModal,
  } = useModal();

  const handleCloseErrorModal = () => {
    closeErrorModal();
    setModalMessage('');
  };

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
      await signInMutate(values);
      navigate(ROUTE.DASHBOARD);
    } catch (error) {
      setModalMessage(getErrorMessage(error));
      openErrorModal();
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
            disabled={!isValid || isPendingSignIn}
            className='bg-primary text-primary-foreground disabled:bg-disabled disabled:text-disabled-foreground w-full cursor-pointer rounded-md px-4 py-2 text-sm font-medium disabled:cursor-not-allowed'
          >
            {isPendingSignIn ? '로그인 중...' : '제출'}
          </button>
        </form>
      </section>

      {isErrorModalOpen && (
        <SignInErrorModal
          message={modalMessage}
          onClose={handleCloseErrorModal}
        />
      )}
    </>
  );
};
