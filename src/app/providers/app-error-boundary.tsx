import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

import { getErrorMessage } from '@/shared';

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  error: unknown;
};

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  public constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  public static getDerivedStateFromError(error: unknown): AppErrorBoundaryState {
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[AppErrorBoundary]', error, errorInfo);
  }

  public render(): ReactNode {
    const { error } = this.state;

    if (error) {
      return (
        <section className='bg-background flex min-h-svh items-center justify-center p-4'>
          <div className='bg-layer w-full max-w-md rounded-xl border p-5'>
            <h1 className='text-content-primary text-lg font-semibold'>오류가 발생했습니다.</h1>
            <p className='text-content-secondary mt-2 text-sm'>{getErrorMessage(error)}</p>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
