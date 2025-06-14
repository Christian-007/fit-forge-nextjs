'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { GiftIcon, ListBulletIcon, UserIcon } from '@heroicons/react/24/solid';

import { BOTTOM_BAR_HIDDEN_ROUTES } from './constant';

export function BottomBar() {
  const currentPathname = usePathname();

  const hasActiveLink = (url: string) => {
    return currentPathname === url ? 'text-white' : 'text-[#96C4A8]';
  };

  const shouldHide = BOTTOM_BAR_HIDDEN_ROUTES.some((prefix: string) =>
    currentPathname.startsWith(prefix)
  );
  if (shouldHide) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 flex w-full items-center justify-between bg-[#1C3024] px-12 py-3 sm:w-[480px]">
      <div className="text-sm font-medium">
        <Link href="/todos" className="flex flex-col items-center hover:opacity-60">
          <ListBulletIcon className={clsx(hasActiveLink('/todos'), 'size-6')} />
          <span className={clsx(hasActiveLink('/todos'), 'mt-1')}>Todos</span>
        </Link>
      </div>
      <div className="text-sm font-medium">
        <Link href="/points" className="flex flex-col items-center hover:opacity-60">
          <GiftIcon className={clsx(hasActiveLink('/points'), 'size-6')} />
          <span className={clsx(hasActiveLink('/points'), 'mt-1')}>Points</span>
        </Link>
      </div>
      <div className="text-sm font-medium">
        <Link href="/profile" className="flex flex-col items-center hover:opacity-60">
          <UserIcon className={clsx(hasActiveLink('/profile'), 'size-6')} />
          <span className={clsx(hasActiveLink('/profile'), 'mt-1')}>Profile</span>
        </Link>
      </div>
    </nav>
  );
}
