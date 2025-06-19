import { NextRequest } from 'next/server';

import { createUsersHandler } from '@/src/handlers/users.handler';
import { UsersRepositoryHttp } from '@/src/repositories/users.repository.http';

const handler = createUsersHandler({
  usersRepository: UsersRepositoryHttp(),
});

export async function POST(request: NextRequest) {
  return handler.postOneUser(request);
}
