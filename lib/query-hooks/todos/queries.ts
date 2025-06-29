import { queryOptions, useQuery } from '@tanstack/react-query';

import { TODO_QUERY_KEY } from '../keys';
import { fetchAllTodos, fetchOneTodo } from './api';

export const todoListOptions = queryOptions({
  queryKey: [TODO_QUERY_KEY],
  queryFn: fetchAllTodos,
});

export const useTodos = () => {
  return useQuery(todoListOptions);
};

export const useOneTodo = (todoId: number) => {
  return useQuery({
    queryKey: [TODO_QUERY_KEY, todoId],
    queryFn: () => fetchOneTodo(todoId),
  });
};
