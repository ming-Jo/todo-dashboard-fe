import { type PropsWithChildren, useEffect } from 'react';

import { useInitializeSessionMutation } from '@/entities/auth';

export const AuthSessionInitializer = ({ children }: PropsWithChildren) => {
  const { mutate } = useInitializeSessionMutation();

  useEffect(() => {
    mutate();
  }, [mutate]);

  return children;
};
