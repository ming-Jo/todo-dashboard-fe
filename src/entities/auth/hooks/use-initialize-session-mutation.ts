import { useMutation } from '@tanstack/react-query';

import { initializeSession } from '../api';

export const useInitializeSessionMutation = () =>
  useMutation({
    mutationFn: initializeSession,
  });
