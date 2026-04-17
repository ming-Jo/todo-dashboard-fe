import { Suspense } from 'react';

import { UserProfile } from '@/widgets/user';

import { PageFallback } from '@/shared';

export const UserPage = () => (
  <Suspense
    fallback={
      <PageFallback
        title='회원정보'
        description='회원정보를 불러오는 중입니다.'
      />
    }
  >
    <UserProfile />
  </Suspense>
);
