import { AuthVerifyDtoHttp, LoginResponseDtoHttp } from '@/app/data/auth/auth.dto.http';

import { AuthEntity } from './auth.entity';

export interface AuthRepository {
  login(data: AuthEntity): Promise<LoginResponseDtoHttp>;
  logout(): Promise<void>;
  verify(token: string): Promise<AuthVerifyDtoHttp>;
}
