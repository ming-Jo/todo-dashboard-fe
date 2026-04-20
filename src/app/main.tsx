import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './styles/index.css';

import { AppProvider } from './providers';
import { router } from './router';

const startApp = async (): Promise<void> => {
  const enableMsw = import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === 'true';

  if (enableMsw) {
    const { worker } = await import('@/mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </StrictMode>,
  );
};

void startApp();
