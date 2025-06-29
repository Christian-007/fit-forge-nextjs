'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { AddTodoFormInputs, addTodoSchema } from './add-todo-schema';

import { useCreateOneTodo } from '@/lib/query-hooks/todos';

export function AddTodoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTodoFormInputs>({
    resolver: zodResolver(addTodoSchema),
    mode: 'onChange',
  });
  const createTodoMutation = useCreateOneTodo();
  const router = useRouter();

  const onSubmit = async (formData: AddTodoFormInputs) => {
    createTodoMutation.mutate(
      { title: formData.title },
      { onSuccess: () => router.push('/todos') }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="title" className="my-2 block text-[#96C4A8]">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="w-full rounded-md bg-[#2645] px-4 py-3 text-[#96C4A8] ring-1 ring-[#2645] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38E078]"
          {...register('title')}
        />
        {errors.title && <p className="mt-1 h-4 text-sm text-red-500">{errors.title?.message}</p>}
      </div>
      <button
        disabled={createTodoMutation.isPending}
        type="submit"
        className="mt-8 block w-full rounded-full bg-[#38E078] p-4 text-center text-[16px] font-bold text-[#122117] hover:opacity-70"
      >
        {createTodoMutation.isPending ? 'Adding todo...' : 'Create Todo'}
      </button>
    </form>
  );
}
