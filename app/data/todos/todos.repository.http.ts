import { mapTodoDtoHttp, mapTodosCollection } from './todos.mapper';

import { TodosRepository } from '@/app/core/repositores/todos.repository';
import { HttpCollection } from '@/app/shared/http/http';
import { TodosDtoHttp, UpdateTodoDto, UpdateTodoDtoHttp } from '@/app/data/todos/todos.dto.http';
import { FetchError } from '@/app/shared/errors/fetch.error';

export function TodosRepositoryHttp(): TodosRepository {
  async function findAll(): Promise<HttpCollection<TodosDtoHttp>> {
    try {
      const res = await fetch('/api/proxy/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errResponseBody = await res.json().catch(() => {});
        throw new FetchError(
          res,
          `Next.js API HTTP error! Status: ${res.status} - ${res.statusText}, Message: ${errResponseBody.message}`
        );
      }

      const data = await res.json();
      return mapTodosCollection(data);
    } catch (error: any) {
      throw new Error(`Next.js API HTTP error! Message: ${error.message}`);
    }
  }

  async function updateOne(updateTodo: UpdateTodoDto): Promise<void> {
    const updateTodoDtoHttp: UpdateTodoDtoHttp = mapTodoDtoHttp(updateTodo);

    try {
      const res = await fetch(`/api/proxy/todos/${updateTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTodoDtoHttp),
      });
      if (!res.ok) {
        const errResponseBody = await res.json().catch(() => {});
        throw new FetchError(
          res,
          `Next.js API HTTP error! Status: ${res.status} - ${res.statusText}, Message: ${errResponseBody.message}`
        );
      }

      return await res.json();
    } catch (error: any) {
      if (error instanceof FetchError) {
        throw error;
      }
      throw new Error(`Next.js API HTTP error! Message: ${error.message}`);
    }
  }

  return {
    findAll,
    updateOne,
  };
}
