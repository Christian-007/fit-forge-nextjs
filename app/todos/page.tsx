'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

import { BottomBar, TopbarConfig } from '@/app/shared/components';
import { TopbarConfigSetter } from '@/app/shared/components/topbar/topbar-config-setter';
import { LoadingIndicator } from '@/app/login/components/loading/loading';
import { TodosRepository } from '@/app/core/repositores/todos.repository';
import { TodosRepositoryHttp } from '@/app/data/todos/todos.repository.http';
import { TodosDtoHttp } from '@/app/data/todos/todos.dto.http';

const topbarConfig: TopbarConfig = {
  center: 'My Todos',
  right: (
    <Link href="/todos/add" className="hover:opacity-60">
      <PlusCircleIcon className="size-6 text-white" />
    </Link>
  ),
};

const todosRepository: TodosRepository = TodosRepositoryHttp();

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodosDtoHttp[]>([]);

  const fetchAllTodos = async () => {
    setIsLoading(true);
    try {
      const res = await todosRepository.findAll();
      setIsLoading(false);
      setTodos(res.results);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <>
          <div className="px-4 pt-10">
            <h1 className="text-center text-[28px] font-bold">
              <LoadingIndicator text="Getting your todos..." />
            </h1>
            <p className="mt-3 text-center">Please hold on while we fetch your todos.</p>
          </div>
        </>
      );
    }

    if (todos.length === 0) {
      return (
        <>
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
        </>
      );
    }

    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div className="flex h-full flex-col items-center justify-center">{renderMainContent()}</div>
      <BottomBar />
    </>
  );
}
