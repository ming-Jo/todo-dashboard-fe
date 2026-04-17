import { useQuery } from '@tanstack/react-query';

import { type UserResponse } from '@/shared';

import { fetchUserProfile } from '../api';
import { useHasAccessToken } from '../model';

import { AUTH_QUERY_KEY } from './query-keys';

export const useUserProfileQuery = () => {
  const hasAccessToken = useHasAccessToken();

  return useQuery<UserResponse>({
    queryKey: AUTH_QUERY_KEY.profile(),
    queryFn: fetchUserProfile,
    enabled: hasAccessToken,
  });
};
