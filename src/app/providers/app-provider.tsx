import type { PropsWithChildren } from 'react';

import { AppErrorBoundary } from './app-error-boundary';
import { AuthSessionInitializer } from './auth-session-initializer';
import { QueryProvider } from './query-provider';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <AppErrorBoundary>
      <QueryProvider>
        <AuthSessionInitializer>{children}</AuthSessionInitializer>
      </QueryProvider>
    </AppErrorBoundary>
  );
};
