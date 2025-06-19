import { NextRequest, NextResponse } from 'next/server';

import { createAuthHandler } from '@/src/handlers/auth.handler';
import { AuthRepositoryHttp } from '@/src/repositories/auth.repository.http';

const handler = createAuthHandler({
  authRepository: AuthRepositoryHttp(),
});

export async function POST(request: NextRequest) {
  return handler.postLogin(request);
}
