import { CreateUserDtoHttp } from '@/app/data/users/user.dto.http';

export interface UsersRepository {
  create(data: CreateUserDtoHttp): Promise<void>;
}
