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
          src="/success-verification.png"
          alt="Picture of a person celebrates a success"
          width={300}
          height={300}
          priority
        />
        <div className="px-4">
          <h1 className="text-center text-[28px] font-bold">Email verified successfully!</h1>
          <p className="mt-3 text-center">
            Your account is now active. You can log in and start using our services.
          </p>
          <Link
            href="/login"
            className="mt-10 block w-full rounded-full bg-[#38E078] p-4 text-center text-[16px] font-bold text-[#122117] hover:opacity-70"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </>
  );
}
