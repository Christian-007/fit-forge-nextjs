import Image from 'next/image';
import Link from 'next/link';

import { TopbarConfig } from '@/app/shared/components';
import { TopbarConfigSetter } from '@/app/shared/components/topbar/topbar-config-setter';

const topbarConfig: TopbarConfig = {
  center: 'Fit Forge',
};

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <TopbarConfigSetter config={topbarConfig} />
      <Image
        src="/landing-page-illustration.png"
        alt="Picture of someone explaining something"
        width={300}
        height={300}
        priority
      />
      <div className="px-4">
        <h1 className="text-center text-[28px] font-bold">
          Organize your life, one task at a time
        </h1>
        <p className="text-center">
          Fit Forge helps you manage your daily tasks, earn rewards, and stay productive. Sign up or
          log in to get started!
        </p>
        <Link
          href="/sign-up"
          className="mt-24 block w-full rounded-full bg-[#38E078] p-4 text-center text-[16px] font-bold text-[#122117] hover:opacity-70"
        >
          Sign up now!
        </Link>
        <Link
          href="/login"
          className="mt-2 block w-full rounded-full bg-[#29382E] p-4 text-center text-[16px] font-bold hover:opacity-70"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
