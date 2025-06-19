import { cookies } from 'next/headers';

import { UsersRepository } from '@/src/repositories/users.repository';
import { CreateUserDto } from '@/src/dtos/users.dto';
import { safeJsonParse } from '@/lib/http/safe-json';

export type UsersHandlerOptions = {
  usersRepository: UsersRepository;
};

export function createUsersHandler(options: UsersHandlerOptions) {
  const { usersRepository } = options;

  async function postOneUser(request: Request) {
    const jsonParseResult = await safeJsonParse<CreateUserDto>(request);
    if (!jsonParseResult.ok) {
      return Response.json({ error: jsonParseResult.error }, { status: 400 });
    }

    const res = await usersRepository.create(jsonParseResult.body as CreateUserDto, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      return Response.json({ error: res.error }, { status: res.status });
    }

    return Response.json(res.body, { status: res.status });
  }

  async function getUserProfile() {
    const token = cookies().get('token')?.value;
    const res = await usersRepository.getProfile({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return Response.json({ error: res.error }, { status: res.status });
    }

    return Response.json(res.body, { status: res.status });
  }

  return {
    postOneUser,
    getUserProfile,
  };
}
