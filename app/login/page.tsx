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
        <img
          className="my-2"
          src="fit_forge_logo.png"
          alt="Fit Forge Logo"
          width="150"
          height="150"
        />
        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <label htmlFor="email" className="my-2 block font-semibold text-slate-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full appearance-none rounded-md px-4 py-2 ring-1 ring-slate-400"
              />
              <p className="mt-1 h-4 text-sm text-red-500">{errors.email?.message}</p>
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="my-2 block font-semibold text-slate-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register('password')}
                className="w-full appearance-none rounded-md px-4 py-2 ring-1 ring-slate-400"
              />
              <p className="mt-1 h-4 text-sm text-red-500">{errors.password?.message}</p>
            </div>
            <button
              type="submit"
              className="my-2 flex w-full items-center justify-center rounded-md bg-slate-900 p-2 font-semibold text-white hover:bg-slate-700 focus:bg-slate-700"
            >
              {isLoading ? <LoadingIndicator text="Logging in..." /> : 'Login to account'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
