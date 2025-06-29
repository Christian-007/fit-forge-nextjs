import Link from 'next/link';
import Image from 'next/image';

import { TopbarConfig } from '@/app/_shared/components';
import { TopbarConfigSetter } from '@/app/_shared/components/topbar/topbar-config-setter';

const topbarConfig: TopbarConfig = {
  center: 'Fit Forge',
};

export default function Page() {
  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div className="flex h-full flex-col items-center justify-center">
        <Image
          src="/failed-verification.png"
          alt="Picture of a person celebrates a success"
          width={300}
          height={300}
          priority
        />
        <div className="px-4">
          <h1 className="text-center text-[28px] font-bold">
            Verification link invalid or expired.
          </h1>
          <p className="mt-3 text-center">
            The verification link you used is no longer valid or already expired. Please request a
            new verification email to continue.
          </p>
          <Link
            href="/"
            className="mt-10 block w-full rounded-full bg-[#38E078] p-4 text-center text-[16px] font-bold text-[#122117] hover:opacity-70"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </>
  );
}
