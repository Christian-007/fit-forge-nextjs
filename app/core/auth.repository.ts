import { UserResponseDtoFitForge } from '@/app/data/users/user-response.dto.fit-forge';
import { AuthEntity } from './auth.entity';

export interface AuthRepository {
  login(data: AuthEntity): Promise<void>;
  verify(token: string): Promise<UserResponseDtoFitForge>;
}
