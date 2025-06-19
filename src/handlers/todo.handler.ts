import { cookies } from 'next/headers';

import { TodosRepository } from '@/src/repositories/todos.repository';
import { CreateTodoDto, UpdateTodoDto } from '@/src/dtos/todo.dto';
import { safeJsonParse } from '@/lib/http/safe-json';

export type TodoHandlerOptions = {
  todoRepository: TodosRepository;
};

export function createTodoHandler(options: TodoHandlerOptions) {
  const { todoRepository } = options;

  async function getAllTodos() {
    const token = cookies().get('token')?.value;
    const res = await todoRepository.findAll({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return Response.json({ error: res.error }, { status: res.status });
    }

    return Response.json(res.body, { status: res.status });
  }

  async function getOneTodo(id: number) {
    const token = cookies().get('token')?.value;
    const res = await todoRepository.findOne(id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return Response.json({ error: res.error }, { status: res.status });
    }

    return Response.json(res.body, { status: res.status });
  }

  async function createOneTodo(request: Request) {
    const jsonParseResult = await safeJsonParse<CreateTodoDto>(request);
    if (!jsonParseResult.ok) {
      return Response.json({ error: jsonParseResult.error }, { status: 400 });
    }

    const token = cookies().get('token')?.value;
    const res = await todoRepository.createOne(jsonParseResult.body as CreateTodoDto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return Response.json({ error: res.error }, { status: res.status });
    }

    return Response.json(res.body, { status: res.status });
  }

  async function updateOneTodo(request: Request, id: number) {
    const jsonParseResult = await safeJsonParse<UpdateTodoDto>(request);
    if (!jsonParseResult.ok) {
      return Response.json({ error: jsonParseResult.error }, { status: 400 });
    }

    const reqBody: UpdateTodoDto = {
      ...jsonParseResult.body,
      id,
    };
    const token = cookies().get('token')?.value;
    const res = await todoRepository.updateOne(reqBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return Response.json({ error: res.error }, { status: res.status });
    }

    return new Response(null, { status: 204 });
  }

  async function deleteOneTodo(id: number) {
    const token = cookies().get('token')?.value;
    const res = await todoRepository.deleteOne(id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return Response.json({ error: res.error }, { status: res.status });
    }

    return Response.json(res.body, { status: res.status });
  }

  return {
    getAllTodos,
    getOneTodo,
    createOneTodo,
    updateOneTodo,
    deleteOneTodo,
  };
}
