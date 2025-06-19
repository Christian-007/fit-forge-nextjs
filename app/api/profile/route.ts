import { createUsersHandler } from '@/src/handlers/users.handler';
import { UsersRepositoryHttp } from '@/src/repositories/users.repository.http';

const handler = createUsersHandler({
  usersRepository: UsersRepositoryHttp(),
});

export async function GET() {
  return handler.getUserProfile();
}
