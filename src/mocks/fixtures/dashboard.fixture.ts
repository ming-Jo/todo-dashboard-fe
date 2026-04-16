import type { DashboardResponse } from '@/shared';

export const MOCK_DASHBOARD = {
  numOfTask: 32,
  numOfRestTask: 11,
  numOfDoneTask: 21,
} as const satisfies DashboardResponse;
