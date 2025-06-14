import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { TopbarConfig } from '@/app/shared/components';
import { TopbarConfigSetter } from '@/app/shared/components/topbar/topbar-config-setter';

const topbarConfig: TopbarConfig = {
  left: (
    <Link href="/todos" className="hover:opacity-60">
      <XMarkIcon className="size-6 text-white" />
    </Link>
  ),
  center: 'Add Todo',
};

export default function Page() {
  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div className="flex h-full flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <form>
            <div className="mb-4">
              <label htmlFor="title" className="my-2 block text-[#96C4A8]">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full rounded-md bg-[#2645] px-4 py-3 text-[#96C4A8] ring-1 ring-[#2645] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38E078]"
              />
            </div>
            <button
              type="submit"
              className="mt-8 block w-full rounded-full bg-[#38E078] p-4 text-center text-[16px] font-bold text-[#122117] hover:opacity-70"
            >
              Create Todo
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
