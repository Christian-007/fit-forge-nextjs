import { UserResponseDtoFitForge } from '@/app/data/users/user-response.dto.fit-forge';
import { LoginResponseDtoHttp } from '@/app/data/auth/auth-response.dto.http';

import { AuthEntity } from './auth.entity';

export interface AuthRepository {
  login(data: AuthEntity): Promise<LoginResponseDtoHttp>;
  logout(): Promise<void>;
  verify(token: string): Promise<UserResponseDtoFitForge>;
}
