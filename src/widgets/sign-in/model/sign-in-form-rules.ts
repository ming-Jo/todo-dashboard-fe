import { type RegisterOptions } from 'react-hook-form';

import { type SignInRequest } from '@/shared';

type SignInFieldRules = Record<keyof SignInRequest, RegisterOptions<SignInRequest>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^[A-Za-z0-9]+$/;

export const signInFormRules: SignInFieldRules = {
  email: {
    required: '이메일은 필수입니다.',
    pattern: {
      value: EMAIL_REGEX,
      message: '올바른 이메일 형식이 아닙니다.',
    },
  },
  password: {
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
      value: PASSWORD_REGEX,
      message: '비밀번호는 영문과 숫자만 사용할 수 있습니다.',
    },
  },
};
