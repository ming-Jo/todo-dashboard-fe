import type { UserResponse } from '@/shared';

export const MOCK_USER = {
  name: '홍길동',
  memo: 'MSW 기반 테스트 유저입니다.',
} as const satisfies UserResponse;
