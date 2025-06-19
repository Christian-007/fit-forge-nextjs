'use client';

import { useSearchParams } from 'next/navigation';

import { useEmailVerification } from './hooks/email-verification.hooks';

import { LoadingIndicator } from '@/app/login/components/loading/loading';
import { TopbarConfig } from '@/app/shared/components';
import { TopbarConfigSetter } from '@/app/shared/components/topbar/topbar-config-setter';
import { AuthRepository } from '@/app/core/auth.repository';
import { AuthRepositoryHttp } from '@/app/data/auth/auth.repository.http';

const topbarConfig: TopbarConfig = {
  center: 'Fit Forge',
};

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  useEmailVerification(token);

  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div className="flex h-[calc(100vh-56px)] flex-col items-center justify-center">
        <div className="px-4">
          <h1 className="text-center text-[28px] font-bold">
            <LoadingIndicator text="Verifying Your Email..." />
          </h1>
          <p className="mt-3 text-center">
            Please hold on while we confirm your verification link. This will only take a moment.
          </p>
        </div>
      </div>
    </>
  );
}
