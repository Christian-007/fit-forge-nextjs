import { Suspense } from 'react';

import EmailVerificationHandler from './email-verification-handler';

import { TopbarConfig } from '@/app/_shared/components';
import { TopbarConfigSetter } from '@/app/_shared/components/topbar/topbar-config-setter';

const topbarConfig: TopbarConfig = {
  center: 'Fit Forge',
};

export default function Page() {
  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div className="flex h-[calc(100vh-56px)] flex-col items-center justify-center">
        <div className="px-4">
          <h1 className="text-center text-[28px] font-bold">
            <Suspense fallback={<div>Loading...</div>}>
              <EmailVerificationHandler />
            </Suspense>
          </h1>
          <p className="mt-3 text-center">
            Please hold on while we confirm your verification link. This will only take a moment.
          </p>
        </div>
      </div>
    </>
  );
}
