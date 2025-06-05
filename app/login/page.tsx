'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';

import { LoadingIndicator } from '@/app/login/components/loading/loading';
import { AuthRepository } from '@/app/core/auth.repository';
import { AuthRepositoryHttp } from '@/app/data/auth/auth.repository.http';
import { TopbarConfig } from '@/app/shared/components';
import { TopbarConfigSetter } from '@/app/shared/components/topbar/topbar-config-setter';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const topbarConfig: TopbarConfig = {
  left: (
    <Link href="/" className="hover:opacity-60">
      <ArrowLongLeftIcon className="size-6 text-white" />
    </Link>
  ),
  center: 'Login',
};

export default function Page() {
  const authRepository: AuthRepository = AuthRepositoryHttp();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: LoginFormInputs): Promise<void> {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      await authRepository.login({
        username: data.email,
        password: data.password,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div className="flex h-full flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="my-2 block text-[#96C4A8]">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your-email@example.com"
                className="w-full rounded-md bg-[#2645] px-4 py-3 text-[#96C4A8] ring-1 ring-[#2645] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38E078]"
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 h-4 text-sm text-red-500">{errors.email?.message}</p>
              )}
            </div>
            <div className="mb-8">
              <label htmlFor="password" className="my-2 block text-[#96C4A8]">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full rounded-md bg-[#2645] px-4 py-3 text-[#96C4A8] ring-1 ring-[#2645] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38E078]"
                {...register('password')}
              />
              {errors.password && (
                <p className="mt-1 h-4 text-sm text-red-500">{errors.password?.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="block w-full rounded-full bg-[#38E078] p-4 text-center text-[16px] font-bold text-[#122117] hover:opacity-70"
            >
              {isLoading ? <LoadingIndicator text="Logging in..." /> : 'Login'}
            </button>
            <div className="mt-4 text-center text-sm text-[#96C4A8]">
              <span>Don't have an account?</span>
              <Link href="/sign-up" className="ml-1 underline hover:text-white">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
