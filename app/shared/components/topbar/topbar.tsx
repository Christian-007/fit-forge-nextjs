'use client';

import { useContext } from 'react';

import { TopbarContext } from './topbar.context';

export function Topbar() {
  const { config } = useContext(TopbarContext);

  return (
    <header className="fixed flex w-[480px] items-center justify-between bg-[#152119] p-4 pb-2">
      <div className="flex-none">{config.left}</div>
      <div className="grow text-center text-lg font-bold leading-tight">{config.center}</div>
      <div className="flex flex-none justify-end">{config.right}</div>
    </header>
  );
}
