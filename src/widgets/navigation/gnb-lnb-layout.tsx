import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ListTodo, LogIn, UserRound } from 'lucide-react';

import { useHasAccessToken, useUserProfileQuery } from '@/entities/auth';

import { ROUTE } from '@/shared';

const navigationLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  [
    'flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition',
    isActive
      ? 'border-primary bg-primary text-primary-foreground'
      : 'bg-layer text-content-primary hover:bg-layer-elevated',
  ].join(' ');

export const GnbLnbLayout = () => {
  const hasAccessToken = useHasAccessToken();
  const { data: profile } = useUserProfileQuery();

  const isLoggedIn = hasAccessToken && Boolean(profile);
  const authNavigation = isLoggedIn
    ? { icon: UserRound, label: '회원정보', target: ROUTE.USER }
    : { icon: LogIn, label: '로그인', target: ROUTE.SIGN_IN };
  const AuthIcon = authNavigation.icon;

  return (
    <div className='bg-background min-h-svh'>
      <header className='bg-layer border-b'>
        <div className='mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4'>
          <p className='text-content-primary text-sm font-semibold'>KB Healthcare</p>
          <NavLink
            to={authNavigation.target}
            className='text-content-secondary inline-flex items-center gap-1.5 text-sm hover:underline'
          >
            <AuthIcon size={16} aria-hidden='true' />
            {authNavigation.label}
          </NavLink>
        </div>
      </header>

      <div className='mx-auto grid w-full max-w-6xl grid-cols-[220px_1fr] gap-4 px-4 py-4'>
        <aside className='bg-layer h-fit rounded-xl border p-3'>
          <nav className='flex flex-col gap-2'>
            <NavLink
              to={ROUTE.DASHBOARD}
              end
              className={navigationLinkClassName}
            >
              <LayoutDashboard size={16} aria-hidden='true' />
              대시보드
            </NavLink>
            <NavLink
              to={ROUTE.TASK_LIST}
              className={navigationLinkClassName}
            >
              <ListTodo size={16} aria-hidden='true' />
              할 일
            </NavLink>
          </nav>
        </aside>

        <main className='bg-layer min-h-[calc(100svh-88px)] rounded-xl border p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
