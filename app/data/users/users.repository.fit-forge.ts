import { UserEntity } from '@/app/core/entities/user.entity';
import { UsersRepository } from '@/app/core/repositores/users.repository';
import { FetchError } from '@/app/shared/errors/fetch.error';

export function UsersRepositoryFitForge(): UsersRepository {
  const baseUrl: string = 'http://localhost:4000';

  async function create(data: UserEntity): Promise<void> {
    const res = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    if (!res.ok) {
      throw new FetchError(res, `HTTP error! Status: ${res.status} - ${res.statusText}`);
    }

    return await res.json();
  }

  return {
    create,
  };
}
