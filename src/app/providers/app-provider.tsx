import type { PropsWithChildren } from 'react';

import { AppErrorBoundary } from './app-error-boundary';
import { QueryProvider } from './query-provider';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <AppErrorBoundary>
      <QueryProvider>{children}</QueryProvider>
    </AppErrorBoundary>
  );
};
