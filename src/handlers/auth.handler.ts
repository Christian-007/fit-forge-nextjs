import { cookies } from 'next/headers';

import { AuthRepository } from '@/src/repositories/auth.repository';
import { LoginDto, LoginResponseDto } from '@/src/dtos/auth.dto';
import { safeJsonParse } from '@/lib/http/safe-json';

export type AuthHandlerOptions = {
  authRepository: AuthRepository;
};

export function createAuthHandler(options: AuthHandlerOptions) {
  const { authRepository } = options;

  async function postLogin(request: Request) {
    const jsonParseResult = await safeJsonParse<LoginDto>(request);
    if (!jsonParseResult.ok) {
      return Response.json({ error: jsonParseResult.error }, { status: 400 });
    }

    const res = await authRepository.login(jsonParseResult.body as LoginDto, {
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.ENV === 'production' ? { 'x-api-key': process.env.API_GATEWAY_KEY } : {}),
      },
    });
    if (!res.ok) {
      return Response.json({ error: res.error }, { status: res.status });
    }

    cookies().set('token', (res.body as LoginResponseDto).accessToken, {
      httpOnly: true,
      secure: process.env.ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return Response.json(res.body, { status: res.status });
  }

  async function postLogout() {
    const token = cookies().get('token')?.value;
    const res = await authRepository.logout({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return Response.json({ error: res.error }, { status: res.status });
    }

    cookies().delete('token');
    return Response.json(res.body, { status: res.status });
  }

  async function postVerify(emailVerificationToken: string) {
    const res = await authRepository.verify(emailVerificationToken);
    if (!res.ok) {
      return Response.json({ error: res.error }, { status: res.status });
    }

    return Response.json(res.body, { status: res.status });
  }

  return {
    postLogin,
    postLogout,
    postVerify,
  };
}
