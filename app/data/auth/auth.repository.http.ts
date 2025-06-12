import { AuthEntity } from '@/app/core/auth.entity';
import { AuthRepository } from '@/app/core/auth.repository';
import { FetchError } from '@/app/shared/errors/fetch.error';

import { UserResponseDtoFitForge } from '../users/user-response.dto.fit-forge';
import { LoginResponseDtoHttp } from './auth-response.dto.http';

export function AuthRepositoryHttp(): AuthRepository {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_API_URL;

  if (!baseUrl) {
    throw new Error('baseUrl is not defined!');
  }

  async function login(data: AuthEntity): Promise<LoginResponseDtoHttp> {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errResponseBody = await res.json().catch(() => {});
      throw new FetchError(
        res,
        `Next.js API HTTP error! Status: ${res.status} - ${res.statusText}, Message: ${errResponseBody.message}`
      );
    }

    const resJson = await res.json();
    return resJson;
  }

  async function logout(): Promise<void> {
    const res = await fetch('/api/logout', {
      method: 'POST',
    });
    if (!res.ok) {
      const errResponseBody = await res.json().catch(() => {});
      throw new FetchError(
        res,
        `Next.js API HTTP error! Status: ${res.status} - ${res.statusText}, Message: ${errResponseBody.message}`
      );
    }

    return await res.json();
  }

  async function verify(token: string): Promise<UserResponseDtoFitForge> {
    const res = await fetch(`${baseUrl}/auth/verify/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new FetchError(res, `HTTP error! Status: ${res.status} - ${res.statusText}`);
    }

    return await res.json();
  }

  return {
    login,
    logout,
    verify,
  };
}
