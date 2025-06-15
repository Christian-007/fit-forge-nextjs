import { mapTodoDtoHttp, mapTodosCollection } from './todos.mapper';

import { TodosRepository } from '@/app/core/repositores/todos.repository';
import { HttpCollection, NextHttpResult } from '@/app/shared/http/http';
import {
  CreateTodoDto,
  CreateTodoResponseDto,
  TodosDtoHttp,
  UpdateTodoDto,
  UpdateTodoDtoHttp,
} from '@/app/data/todos/todos.dto.http';
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

  async function findOne(id: number): Promise<NextHttpResult<TodosDtoHttp | null>> {
    try {
      const res = await fetch(`/api/proxy/todos/${id}`, {
        method: 'GET',
      });
      console.log('RES: ', res);
      if (!res.ok) {
        const errResponseBody = await res.json().catch(() => {});
        return {
          data: null,
          message: errResponseBody.message ?? 'Unexpected error happened',
          status: res.status,
          success: false,
        };
      }

      return await res.json();
    } catch (error: any) {
      return {
        data: null,
        message: error.message ?? 'Unexpected error happened',
        status: 500,
        success: false,
      };
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

  async function deleteOne(todoId: number): Promise<void> {
    try {
      const res = await fetch(`/api/proxy/todos/${todoId}`, {
        method: 'DELETE',
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

  async function createOne(todo: CreateTodoDto): Promise<CreateTodoResponseDto> {
    try {
      const res = await fetch(`/api/proxy/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      if (!res.ok) {
        const errResponseBody = await res.json().catch(() => {});
        throw new FetchError(
          res,
          `Next.js API HTTP error! Status: ${res.status} - ${res.statusText}, Message: ${errResponseBody.message}`
        );
      }

      const nextResult: NextHttpResult<CreateTodoResponseDto> = await res.json();
      return {
        id: nextResult.data.id,
        title: nextResult.data.title,
        isCompleted: nextResult.data.isCompleted,
        points: nextResult.data.points,
      };
    } catch (error: any) {
      if (error instanceof FetchError) {
        throw error;
      }
      throw new Error(`Next.js API HTTP error! Message: ${error.message}`);
    }
  }

  return {
    findAll,
    findOne,
    updateOne,
    deleteOne,
    createOne,
  };
}
