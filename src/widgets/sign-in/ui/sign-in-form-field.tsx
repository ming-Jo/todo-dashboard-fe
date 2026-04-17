import { forwardRef } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { type SignInRequest } from '@/shared';

type SignInFieldName = keyof SignInRequest;

export type SignInFormFieldProps = Omit<UseFormRegisterReturn<SignInFieldName>, 'ref'> & {
  id: string;
  label: string;
  type: 'email' | 'password';
  errorMessage?: string;
};

export const SignInFormField = forwardRef<HTMLInputElement, SignInFormFieldProps>(
  ({ id, label, type, errorMessage, ...registerProps }, ref) => {
    return (
      <div className='space-y-1'>
        <label
          htmlFor={id}
          className='text-content-primary block text-sm font-medium'
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          type={type}
          className='bg-layer focus-visible:ring-focus-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2'
          aria-invalid={Boolean(errorMessage)}
          {...registerProps}
        />
        {errorMessage && <p className='text-error text-xs'>{errorMessage}</p>}
      </div>
    );
  },
);

SignInFormField.displayName = 'SignInFormField';
