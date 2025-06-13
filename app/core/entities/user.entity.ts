export interface UserEntity {
  id: number;
  name: string;
  email: string;
  role: number;
  subscriptionStatus: string;
  emailVerifiedAt?: string;
}
