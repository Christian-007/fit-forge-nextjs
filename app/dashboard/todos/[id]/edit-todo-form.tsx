'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { EditTodoFormInputs, editTodoSchema } from './edit-todo.schema';

import { safeFetchJson } from '@/lib/http/safe-json';
import { TodosDto, UpdateTodoDto } from '@/src/dtos/todo.dto';

type EditTodoFormProps = {
  todoId: number;
};

export default function EditTodoForm({ todoId }: EditTodoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditTodoFormInputs>({
    resolver: zodResolver(editTodoSchema),
    mode: 'onChange',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    const fetchJsonResult = await safeFetchJson<TodosDto>(`/api/todos/${todoId}`, {
      method: 'GET',
    });

    console.log('fetchJsonResult: ', fetchJsonResult);

    if (fetchJsonResult.ok && fetchJsonResult.body) {
      reset({ title: fetchJsonResult.body.title });
      return;
    }
  };

  const onSubmit = async (formData: EditTodoFormInputs) => {
    setIsLoading(true);
    setSubmitError(false);

    const dto: UpdateTodoDto = {
      id: todoId,
      title: formData.title,
    };
    const fetchJsonResult = await safeFetchJson<void>(`/api/todos/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    });
    if (!fetchJsonResult.ok) {
      setIsLoading(false);
      setSubmitError(true);
      return;
    }

    setIsLoading(false);
    setSubmitError(false);
    router.push('/todos');
  };
  return (
    <>
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
          type="submit"
          className="mt-8 block w-full rounded-full bg-[#38E078] p-4 text-center text-[16px] font-bold text-[#122117] hover:opacity-70"
        >
          Submit
        </button>
      </form>
    </>
  );
}
