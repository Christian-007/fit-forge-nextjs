import { AuthVerifyDto, LoginDto, LoginResponseDto } from '@/src/dtos/auth.dto';
import { HttpOptions, HttpResponse } from '@/lib/http/http-client';

export interface AuthRepository {
  login(data: LoginDto, options?: HttpOptions): Promise<HttpResponse<LoginResponseDto>>;
  logout(options?: HttpOptions): Promise<HttpResponse<null>>;
  verify(token: string, options?: HttpOptions): Promise<HttpResponse<AuthVerifyDto>>;
}
