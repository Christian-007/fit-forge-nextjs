import { createAuthHandler } from '@/src/handlers/auth.handler';
import { AuthRepositoryHttp } from '@/src/repositories/auth.repository.http';

const handler = createAuthHandler({
  authRepository: AuthRepositoryHttp(),
});

export async function POST(_: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return handler.postVerify(token);
}
