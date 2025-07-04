import { AuthVerifyDto, LoginDto, LoginResponseDto } from '@/src/dtos/auth.dto';
import { AuthRepository } from '@/src/repositories/auth.repository';
import { HttpOptions, HttpResponse, createHttpClient } from '@/lib/http/http-client';

const httpClient = createHttpClient();

export function AuthRepositoryHttp(): AuthRepository {
  const baseUrl: string | undefined = process.env.CORE_API_URL;
  if (!baseUrl) {
    throw new Error('baseUrl is not defined!');
  }

  async function login(
    data: LoginDto,
    options?: HttpOptions
  ): Promise<HttpResponse<LoginResponseDto>> {
    return await httpClient.post(`${baseUrl}/auth/login`, data, options);
  }

  async function logout(options?: HttpOptions): Promise<HttpResponse<null>> {
    return await httpClient.post(`${baseUrl}/auth/logout`, null, options);
  }

  async function verify(
    token: string,
    options?: HttpOptions
  ): Promise<HttpResponse<AuthVerifyDto>> {
    return await httpClient.post(`${baseUrl}/auth/verify/${token}`, null, options);
  }

  return {
    login,
    logout,
    verify,
  };
}
