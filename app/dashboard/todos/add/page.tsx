import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { AddTodoForm } from './add-todo-form';

import { TopbarConfig } from '@/app/_shared/components';
import { TopbarConfigSetter } from '@/app/_shared/components/topbar/topbar-config-setter';

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
          <AddTodoForm />
        </div>
      </div>
    </>
  );
}
