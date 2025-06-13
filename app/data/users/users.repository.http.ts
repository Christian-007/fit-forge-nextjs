import { UsersRepository } from '@/app/core/repositores/users.repository';
import { FetchError } from '@/app/shared/errors/fetch.error';
import { CreateUserDtoHttp, UserProfileDtoHttp } from '@/app/data/users/user.dto.http';
import { NextHttpResult } from '@/app/shared/http/http';

export function UsersRepositoryHttp(): UsersRepository {
  const baseUrl: string = 'http://localhost:4000';

  async function create(data: CreateUserDtoHttp): Promise<void> {
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

  async function getProfile(): Promise<UserProfileDtoHttp> {
    try {
      const res = await fetch('/api/proxy/profile', {
        method: 'GET',
      });

      if (!res.ok) {
        const errResponseBody = await res.json().catch(() => {});
        throw new FetchError(
          res,
          `Next.js API HTTP error! Status: ${res.status} - ${res.statusText}, Message: ${errResponseBody.message}`
        );
      }

      const nextResult: NextHttpResult<UserProfileDtoHttp> = await res.json();
      return {
        userId: nextResult.data.userId,
        email: nextResult.data.email,
        name: nextResult.data.name,
        role: nextResult.data.role,
        subscriptionStatus: nextResult.data.subscriptionStatus,
      };
    } catch (error: any) {
      if (error instanceof FetchError) {
        throw error;
      }
      throw new Error(`Next.js API HTTP error! Message: ${error.message}`);
    }
  }

  return {
    create,
    getProfile,
  };
}
