import { type UseFormRegisterReturn } from 'react-hook-form';

import { type SignInRequest } from '@/shared';

type SignInFieldName = keyof SignInRequest;

interface SignInFormFieldProps extends UseFormRegisterReturn<SignInFieldName> {
  id: string;
  label: string;
  type: 'email' | 'password';
  errorMessage?: string;
}

export const SignInFormField = ({
  id,
  label,
  type,
  errorMessage,
  ...registerProps
}: SignInFormFieldProps) => {
  return (
    <div className='space-y-1'>
      <label
        htmlFor={id}
        className='text-content-primary block text-sm font-medium'
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className='bg-layer focus-visible:ring-focus-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2'
        aria-invalid={Boolean(errorMessage)}
        {...registerProps}
      />
      {errorMessage && <p className='text-error text-xs'>{errorMessage}</p>}
    </div>
  );
};
