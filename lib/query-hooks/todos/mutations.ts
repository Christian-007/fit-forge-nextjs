import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTodoDto, TodosDto, UpdateTodoDto } from '@/src/dtos/todo.dto';

import { createOneTodo, deleteOneTodo, updateOneTodo } from './api';
import { todoListOptions } from './queries';

export const useCreateOneTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOneTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoListOptions.queryKey });
    },
  });
};

export const useUpdateOneTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateTodoDto, { previousTodos: TodosDto[] | undefined }>({
    mutationFn: updateOneTodo,
    onMutate: async (updateTodoDto: UpdateTodoDto) => {
      await queryClient.cancelQueries(todoListOptions);

      const previousTodos = queryClient.getQueryData<TodosDto[]>(todoListOptions.queryKey);
      if (previousTodos) {
        const updatedTodos = previousTodos.map((todo: TodosDto) => {
          if (todo.id === updateTodoDto.id) {
            return { ...todo, isCompleted: updateTodoDto.isCompleted as boolean };
          }

          return todo;
        });
        queryClient.setQueryData(todoListOptions.queryKey, updatedTodos);
      }

      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(todoListOptions.queryKey, context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoListOptions.queryKey });
    },
  });
};

export const useDeleteOneTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, { previousTodos: TodosDto[] | undefined }>({
    mutationFn: deleteOneTodo,
    onMutate: async (todoId: number) => {
      await queryClient.cancelQueries(todoListOptions);

      const previousTodos = queryClient.getQueryData<TodosDto[]>(todoListOptions.queryKey);
      if (previousTodos) {
        const updatedTodos = previousTodos.filter((todo: TodosDto) => todo.id !== todoId);
        queryClient.setQueryData(todoListOptions.queryKey, updatedTodos);
      }

      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(todoListOptions.queryKey, context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoListOptions.queryKey });
    },
  });
};
