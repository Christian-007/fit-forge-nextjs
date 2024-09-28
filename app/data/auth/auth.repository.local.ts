import { AuthEntity } from "@/app/core/auth.entity";
import { AuthRepository } from "@/app/core/auth.repository";
import { FetchError } from "@/app/shared/errors/fetch.error";

export function AuthRepositoryLocal(): AuthRepository {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_API_URL;

  if (!baseUrl) {
    throw new Error("baseUrl is not defined!");
  }

  async function login(data: AuthEntity): Promise<void> {
    const res = await fetch(`${baseUrl}/auth/login`);
    if (!res.ok) {
      throw new FetchError(
        res,
        `HTTP error! Status: ${res.status} - ${res.statusText}`
      );
    }

    return await res.json();
  }

  return {
    login,
  };
}
