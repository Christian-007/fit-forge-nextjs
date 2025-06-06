import { UserEntity } from '@/app/core/entities/user.entity';

export interface UsersRepository {
  create(data: UserEntity): Promise<void>;
}
