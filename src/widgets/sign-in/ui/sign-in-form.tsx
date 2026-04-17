import { useForm } from 'react-hook-form';

import { type SignInRequest } from '@/shared';

import { signInFormRules } from '../model';

interface SignInFormProps {
  authMessage?: string | null;
  isSubmitting: boolean;
  onSubmit: (values: SignInRequest) => Promise<void>;
}

export const SignInForm = ({ authMessage, isSubmitting, onSubmit }: SignInFormProps) => {
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

  const handleSignInSubmit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
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
        onSubmit={handleSignInSubmit}
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
            {...register('email', signInFormRules.email)}
          />
          {errors.email && <p className='text-error text-xs'>{errors.email.message}</p>}
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
            {...register('password', signInFormRules.password)}
          />
          {errors.password && <p className='text-error text-xs'>{errors.password.message}</p>}
        </div>

        <button
          type='submit'
          disabled={!isValid || isSubmitting}
          className='bg-primary text-primary-foreground disabled:bg-disabled disabled:text-disabled-foreground w-full cursor-pointer rounded-md px-4 py-2 text-sm font-medium disabled:cursor-not-allowed'
        >
          {isSubmitting ? '로그인 중...' : '로그인 하기'}
        </button>
      </form>
    </section>
  );
};
