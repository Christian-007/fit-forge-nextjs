import { UsersRepository } from './users.repository';
import { CreateUserDto, UserProfileDto } from '@/src/dtos/users.dto';
import { HttpOptions, HttpResponse, createHttpClient } from '@/lib/http/http-client';

const httpClient = createHttpClient();

export function UsersRepositoryHttp(): UsersRepository {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_API_URL;
  if (!baseUrl) {
    throw new Error('baseUrl is not defined!');
  }

  async function create(data: CreateUserDto, options?: HttpOptions): Promise<HttpResponse<void>> {
    return await httpClient.post(`${baseUrl}/users`, data, options);
  }

  async function getProfile(options?: HttpOptions): Promise<HttpResponse<UserProfileDto>> {
    return await httpClient.get(`${baseUrl}/profile`, options);
  }

  return {
    create,
    getProfile,
  };
}
