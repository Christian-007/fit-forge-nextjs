'use client';

import Link from 'next/link';
import { GiftIcon, ListBulletIcon, UserIcon } from '@heroicons/react/24/solid';

export function BottomBar() {
  return (
    <nav className="fixed bottom-0 flex w-[480px] items-center justify-between bg-[#1C3024] px-12 py-3">
      <div className="text-sm font-medium">
        <Link href="/todos/add" className="flex flex-col items-center hover:opacity-60">
          <ListBulletIcon className="size-6 text-white" />
          <span className="mt-1 text-white">Todos</span>
        </Link>
      </div>
      <div className="text-sm font-medium">
        <Link href="/todos/add" className="flex flex-col items-center hover:opacity-60">
          <GiftIcon className="size-6 text-[#96C4A8]" />
          <span className="mt-1 text-[#96C4A8]">Points</span>
        </Link>
      </div>
      <div className="text-sm font-medium">
        <Link href="/todos/add" className="flex flex-col items-center hover:opacity-60">
          <UserIcon className="size-6 text-[#96C4A8]" />
          <span className="mt-1 text-[#96C4A8]">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
