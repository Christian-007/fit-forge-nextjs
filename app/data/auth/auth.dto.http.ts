import { SubscriptionStatus } from '@/app/core/enums/subscription-status.enum';

export type LoginResponseDtoHttp = { success: true; status: number };

export interface AuthVerifyDtoHttp {
  id: number;
  name: string;
  email: string;
  role: number;
  subscriptionStatus: SubscriptionStatus;
  emailVerifiedAt: string;
}
