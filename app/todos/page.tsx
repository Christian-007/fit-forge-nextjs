'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

import { BottomBar, TopbarConfig } from '@/app/shared/components';
import { TopbarConfigSetter } from '@/app/shared/components/topbar/topbar-config-setter';

const topbarConfig: TopbarConfig = {
  center: 'My Todos',
  right: (
    <Link href="/todos/add" className="hover:opacity-60">
      <PlusCircleIcon className="size-6 text-white" />
    </Link>
  ),
};

export default function Page() {
  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div className="flex h-full flex-col items-center justify-center">
        <Image
          src="/empty-todo.png"
          alt="Picture of sending a message"
          width={300}
          height={300}
          priority
        />
        <div className="flex flex-col items-center px-4">
          <h1 className="text-center text-[28px] font-bold">Nothing here yet.</h1>
          <p className="mt-3 text-center">Add something new before the peace gets boring.</p>
          <Link
            href="/todos/add"
            className="mt-10 block rounded-full bg-[#38E078] px-6 py-2 text-center text-[16px] font-bold text-[#122117] hover:opacity-70"
          >
            Add todo
          </Link>
        </div>
      </div>
      <BottomBar />
    </>
  );
}
