'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

export function Dialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsOpen(true);
    }, 2_000);

    return () => clearTimeout(delay);
  }, []);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={clsx(
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-500 ease-in-out'
      )}
    >
      <div
        className={clsx(
          isOpen ? 'opacity-100' : 'opacity-0',
          'w-full max-w-md transform rounded-xl bg-[#38E078]/10 p-6 backdrop-blur-2xl transition-opacity duration-500 ease-in-out'
        )}
      >
        <h3 className="text-base/7 font-medium text-white">🙌 Just a Heads-Up</h3>
        <p className="mt-2 text-sm/6 text-white/50">
          Hi, this is Christian, the site creator. This site is one of my personal projects -
          it&apos;s not meant for real use, so please don&apos;t share any personal info. Also,
          running it costs me a bit each time someone visits, so thanks for being mindful!
        </p>
        <div className="mt-4 flex space-x-2">
          <a
            href="https://github.com/Christian-007/fit-forge-nextjs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#38E078]/50 px-3 py-1.5 text-sm/6 font-semibold text-white hover:opacity-60"
          >
            Visit Christian&apos;s GitHub
          </a>
          <button
            onClick={closeDialog}
            className="inline-flex items-center gap-2 rounded-full bg-[#29382E] px-3 py-1.5 text-sm/6 font-semibold text-white hover:opacity-60"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
