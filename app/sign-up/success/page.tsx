'use client';

import Link from 'next/link';
import Image from 'next/image';

import { TopbarConfig } from '@/app/shared/components';
import { TopbarConfigSetter } from '@/app/shared/components/topbar/topbar-config-setter';

const topbarConfig: TopbarConfig = {
  center: 'Fit Forge',
};

export default function Page() {
  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div className="flex h-full flex-col items-center justify-center">
        <Image
          src="/sent-message-illustration.png"
          alt="Picture of sending a message"
          width={300}
          height={300}
          priority
        />
        <div className="px-4">
          <h1 className="text-center text-[28px] font-bold">Registration Successful!</h1>
          <p className="mt-3 text-center">
            We've sent a verification link to your email. Please check your inbox and follow the
            instructions to activate your account.
          </p>
          <Link
            href="/"
            className="mt-10 block w-full rounded-full bg-[#29382E] p-4 text-center text-[16px] font-bold hover:opacity-70"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </>
  );
}
