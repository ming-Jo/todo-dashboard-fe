import { useForm } from 'react-hook-form';

import { type SignInRequest } from '@/shared';

import { signInFormRules } from '../model';

import { SignInFormField } from './sign-in-form-field';

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
    defaultValues: { email: '', password: '' },
  });

  const emailRegister = register('email', signInFormRules.email);
  const { ref: emailRef, ...emailRegisterProps } = emailRegister;
  const passwordRegister = register('password', signInFormRules.password);
  const { ref: passwordRef, ...passwordRegisterProps } = passwordRegister;

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
        <SignInFormField
          ref={emailRef}
          id='email'
          label='이메일'
          type='email'
          errorMessage={errors.email?.message}
          {...emailRegisterProps}
        />
        <SignInFormField
          ref={passwordRef}
          id='password'
          label='비밀번호'
          type='password'
          errorMessage={errors.password?.message}
          {...passwordRegisterProps}
        />
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
