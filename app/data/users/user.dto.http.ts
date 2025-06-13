export interface CreateUserDtoHttp {
  name: string;
  email: string;
  password: string;
}

export interface UserProfileDtoHttp {
  userId: number;
  name: string;
  email: string;
  role: number;
  subscriptionStatus: string;
}
