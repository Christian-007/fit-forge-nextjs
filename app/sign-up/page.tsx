'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLongLeftIcon, XCircleIcon } from '@heroicons/react/24/solid';

import { SignUpFormInputs, signUpSchema } from './sign-up.schema';
import { useUsers } from './hooks/sign-up.hooks';

import { TopbarConfig } from '@/app/shared/components';
import { TopbarConfigSetter } from '@/app/shared/components/topbar/topbar-config-setter';
import { LoadingIndicator } from '@/app/login/components/loading/loading';

const topbarConfig: TopbarConfig = {
  left: (
    <Link href="/" className="hover:opacity-60">
      <ArrowLongLeftIcon className="size-6 text-white" />
    </Link>
  ),
  center: 'Create an Account',
};

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });
  const { loading, createOneUser } = useUsers();
  const [submitError, setSubmitError] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(formData: SignUpFormInputs): Promise<void> {
    setSubmitError(false);

    const error = await createOneUser({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      setSubmitError(true);
      return;
    }

    router.push('/sign-up/success');
  }

  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div className="flex h-full flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          {submitError && (
            <div className="flex w-full items-center rounded-md bg-red-200 p-5 text-red-500">
              <XCircleIcon className="size-5 text-red-500" />
              <span className="ml-2 text-sm">Server timeout. Please try again later.</span>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="fullName" className="my-2 block text-[#96C4A8]">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="e.g. John Doe"
                className="w-full rounded-md bg-[#2645] px-4 py-3 text-[#96C4A8] ring-1 ring-[#2645] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38E078]"
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="mt-1 h-4 text-sm text-red-500">{errors.fullName?.message}</p>
              )}
            </div>
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
            <div className="mb-4">
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
            <div className="mb-8">
              <label htmlFor="confirmPassword" className="my-2 block text-[#96C4A8]">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                className="w-full rounded-md bg-[#2645] px-4 py-3 text-[#96C4A8] ring-1 ring-[#2645] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38E078]"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="mt-1 h-4 text-sm text-red-500">{errors.confirmPassword?.message}</p>
              )}
            </div>
            <button
              disabled={loading}
              type="submit"
              className="block w-full rounded-full bg-[#38E078] p-4 text-center text-[16px] font-bold text-[#122117] hover:opacity-70"
            >
              {loading ? <LoadingIndicator text="Signing up..." /> : 'Sign Up'}
            </button>
            <div className="mt-4 text-center text-sm text-[#96C4A8]">
              <span>Already have an account?</span>
              <Link href="/login" className="ml-1 underline hover:text-white">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
