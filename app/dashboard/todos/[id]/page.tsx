import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';

import EditTodoForm from './edit-todo-form';

import { TopbarConfig } from '@/app/shared/components';
import { TopbarConfigSetter } from '@/app/shared/components/topbar/topbar-config-setter';

const topbarConfig: TopbarConfig = {
  left: (
    <Link href="/todos" className="hover:opacity-60">
      <XMarkIcon className="size-6 text-white" />
    </Link>
  ),
  center: 'Edit Todo',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div className="flex h-full flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <EditTodoForm todoId={+id} />
        </div>
      </div>
    </>
  );
}
