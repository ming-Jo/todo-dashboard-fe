import type { UserResponse } from '@/shared';

export type UserProfile = UserResponse;

export type UserProfileStatus = 'idle' | 'loading' | 'loaded' | 'error';

export type UserProfileState =
  | {
      status: 'idle' | 'loading';
      profile: null;
    }
  | {
      status: 'loaded';
      profile: UserProfile;
    }
  | {
      status: 'error';
      profile: null;
      message: string;
    };
