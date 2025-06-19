export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UserProfileDto {
  userId: number;
  name: string;
  email: string;
  role: number;
  subscriptionStatus: string;
}
