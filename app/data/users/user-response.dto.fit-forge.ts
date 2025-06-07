import { SubscriptionStatus } from '@/app/core/enums/subscription-status.enum';

export interface UserResponseDtoFitForge {
  id: number;
  name: string;
  email: string;
  role: number;
  subscriptionStatus: SubscriptionStatus;
  emailVerifiedAt: string;
}
