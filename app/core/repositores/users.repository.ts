import { CreateUserDtoHttp, UserProfileDtoHttp } from '@/app/data/users/user.dto.http';

export interface UsersRepository {
  create(data: CreateUserDtoHttp): Promise<void>;
  getProfile(): Promise<UserProfileDtoHttp>;
}
