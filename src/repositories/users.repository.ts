import { CreateUserDto, UserProfileDto } from '@/src/dtos/users.dto';
import { HttpOptions, HttpResponse } from '@/lib/http/http-client';

export interface UsersRepository {
  create(data: CreateUserDto, options?: HttpOptions): Promise<HttpResponse<void>>;
  getProfile(options?: HttpOptions): Promise<HttpResponse<UserProfileDto>>;
}
