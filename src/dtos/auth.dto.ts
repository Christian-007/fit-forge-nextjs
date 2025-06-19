import { SubscriptionStatus } from '@/src/enums/subscription-status.enum';

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
}

export interface AuthVerifyDto {
  id: number;
  name: string;
  email: string;
  role: number;
  subscriptionStatus: SubscriptionStatus;
  emailVerifiedAt: string;
}
