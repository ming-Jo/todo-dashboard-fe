import { Navigate, Outlet } from 'react-router-dom';

import { useHasAccessToken } from '@/entities/auth';

import { ROUTE } from '@/shared';

export const ProtectedRoute = () => {
  const hasAccessToken = useHasAccessToken();

  if (!hasAccessToken) {
    return (
      <Navigate
        to={ROUTE.SIGN_IN}
        replace
      />
    );
  }

  return <Outlet />;
};
