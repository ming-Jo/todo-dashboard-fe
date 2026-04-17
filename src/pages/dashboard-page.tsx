import { Suspense } from 'react';

import { DashboardSummary } from '@/widgets/dashboard';

import { PageFallback } from '@/shared';

export const DashboardPage = () => (
  <Suspense
    fallback={
      <PageFallback
        title='대시보드'
        description='대시보드 데이터를 불러오는 중입니다.'
      />
    }
  >
    <DashboardSummary />
  </Suspense>
);
