'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PencilSquareIcon, PlusCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import debounce from 'lodash.debounce';
import clsx from 'clsx';
import toast from 'react-hot-toast';

import { TodoItem } from './_components/todo-item';

import { TopbarConfig } from '@/app/_shared/components';
import { TopbarConfigSetter } from '@/app/_shared/components/topbar/topbar-config-setter';
import { LoadingIndicator } from '@/app/login/_components/loading/loading';
import { TodosDto, UpdateTodoDto } from '@/src/dtos/todo.dto';
import { useDeleteOneTodo, useTodos, useUpdateOneTodo } from '@/lib/query-hooks/todos';

type RewardsSseResponse = {
  points: number;
};

const topbarConfig: TopbarConfig = {
  center: 'My Todos',
  right: (
    <Link href="/todos/add" className="hover:opacity-60">
      <PlusCircleIcon className="size-6 text-white" />
    </Link>
  ),
};

export default function Page() {
  const [selectedTodoId, setSelectedTodoId] = useState<number>(-1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const { data: todos = [], isLoading } = useTodos();
  const deleteTodoMutation = useDeleteOneTodo();
  const updateTodoMutation = useUpdateOneTodo();
  const router = useRouter();

  useEffect(() => {
    const evtSource = new EventSource('http://localhost:4001/sse/rewards', {
      withCredentials: true,
    });

    evtSource.addEventListener('rewards', (eventStream) => {
      const data: RewardsSseResponse = JSON.parse(eventStream.data);

      toast(`You've been rewarded ${data.points} points!`, {
        icon: '🎉',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    });

    return () => {
      evtSource.close();
    };
  }, []);

  const debouncedUpdate = useMemo(() => {
    return debounce((todoId: number, isCompleted: boolean) => {
      updateTodoStatus(todoId, isCompleted);
    }, 300);
  }, []);

  const updateTodoStatus = async (todoId: number, isCompleted: boolean) => {
    const updateTodo: UpdateTodoDto = {
      id: todoId,
      isCompleted,
    };
    updateTodoMutation.mutate(updateTodo);
  };

  const handleOnChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, todoId: number) => {
    const checkedValue = event.target.checked;
    debouncedUpdate(todoId, checkedValue);
  };

  const handleOnClickTodoOption = (todoId: number) => {
    setIsBottomSheetOpen(true);
    setSelectedTodoId(todoId);
  };

  const handleClickCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedTodoId(-1);
  };

  const handleOnClickEditTodo = () => {
    router.push(`/todos/${selectedTodoId}`);
  };

  const handleOnClickDeleteTodo = async () => {
    deleteTodoMutation.mutate(selectedTodoId);
    handleClickCloseBottomSheet();
  };

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-full flex-col items-center justify-center">
          <div className="px-4 pt-10">
            <h1 className="text-center text-[28px] font-bold">
              <LoadingIndicator text="Getting your todos..." />
            </h1>
            <p className="mt-3 text-center">Please hold on while we fetch your todos.</p>
          </div>
        </div>
      );
    }

    if (todos.length === 0) {
      return (
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
      );
    }

    return (
      <div className="flex h-full flex-col justify-center">
        <div className="px-8 py-4">
          <fieldset className="space-y-3">
            {todos.map((todo: TodosDto) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleOnChangeFn={(e, todoId) => handleOnChangeCheckbox(e, todoId)}
                handleOnClickOptionFn={(todoId) => handleOnClickTodoOption(todoId)}
              />
            ))}
          </fieldset>
        </div>
      </div>
    );
  };

  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div
        className={clsx(
          isBottomSheetOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          'fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-200'
        )}
      >
        <div
          className={clsx(
            isBottomSheetOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
            'absolute bottom-0 flex w-full transform flex-col justify-start rounded-lg rounded-b-none bg-zinc-800 p-4 shadow-lg transition-all duration-300 sm:w-[480px]'
          )}
        >
          <div className="mb-4 flex w-full items-center justify-between">
            <div className="grow text-center leading-tight">
              <h2 className="text-lg font-semibold">Options</h2>
            </div>
            <div className="flex flex-none justify-end">
              <button onClick={handleClickCloseBottomSheet}>
                <XMarkIcon className="size-4" />
              </button>
            </div>
          </div>
          <button
            onClick={handleOnClickEditTodo}
            className="mb-2 flex items-center rounded p-2 text-sm font-medium hover:bg-white/5"
          >
            <PencilSquareIcon className="size-4" />
            <span className="pl-4">Edit</span>
          </button>
          <button
            onClick={handleOnClickDeleteTodo}
            className="flex items-center rounded p-2 text-sm font-medium hover:bg-white/5"
          >
            <TrashIcon className="size-4" />
            <span className="pl-4">Delete</span>
          </button>
        </div>
      </div>

      {renderMainContent()}
    </>
  );
}
