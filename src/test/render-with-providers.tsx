import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

import { ROUTE } from '@/shared';

type Options = {
  route?: string;
  path?: string;
} & Omit<RenderOptions, 'wrapper'>;

export const renderWithProviders = (
  ui: ReactElement,
  { route = ROUTE.SIGN_IN, path = ROUTE.SIGN_IN, ...renderOptions }: Options = {},
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route
            path={path}
            element={children}
          />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

  return {
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
