'use client';

import { useContext } from 'react';

import { TopbarContext } from './topbar.context';

export function Topbar() {
  const { config } = useContext(TopbarContext);

  return (
    <header className="fixed flex w-[480px] items-center justify-between bg-[#152119] p-4 pb-2">
      <div className="flex-1">{config.left}</div>
      <div className="text-center text-lg font-bold leading-tight">{config.center}</div>
      <div className="flex flex-1 justify-end">{config.right}</div>
    </header>
  );
}
