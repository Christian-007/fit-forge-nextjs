import { TodosRepository } from '@/src/repositories/todos.repository';
import { CollectionHttp } from '@/src/dtos/todo.dto.http';
import { CreateTodoDto, CreateTodoResponseDto, TodosDto, UpdateTodoDto } from '@/src/dtos/todo.dto';
import { HttpOptions, HttpResponse, createHttpClient } from '@/lib/http/http-client';

const httpClient = createHttpClient();

export function TodosRepositoryHttp(): TodosRepository {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_API_URL;
  if (!baseUrl) {
    throw new Error('baseUrl is not defined!');
  }

  async function findAll(options?: HttpOptions): Promise<HttpResponse<CollectionHttp<TodosDto>>> {
    return await httpClient.get<CollectionHttp<TodosDto>>(`${baseUrl}/todos`, options);
  }

  async function findOne(id: number, options?: HttpOptions): Promise<HttpResponse<TodosDto>> {
    return await httpClient.get<TodosDto>(`${baseUrl}/todos/${id}`, options);
  }

  async function createOne(
    todo: CreateTodoDto,
    options?: HttpOptions
  ): Promise<HttpResponse<CreateTodoResponseDto>> {
    return await httpClient.post(`${baseUrl}/todos`, todo, options);
  }

  async function updateOne(
    updateTodo: UpdateTodoDto,
    options?: HttpOptions
  ): Promise<HttpResponse<void>> {
    const reqBody: Omit<UpdateTodoDto, 'id'> = mapUpdateTodoBody(updateTodo);
    return await httpClient.patch<void>(`${baseUrl}/todos/${updateTodo.id}`, reqBody, options);
  }

  async function deleteOne(todoId: number, options?: HttpOptions): Promise<HttpResponse<void>> {
    return await httpClient.delete(`${baseUrl}/todos/${todoId}`, options);
  }

  function mapUpdateTodoBody(dto: UpdateTodoDto): Omit<UpdateTodoDto, 'id'> {
    const result: Omit<UpdateTodoDto, 'id'> = {};

    if (dto.title != undefined) {
      result.title = dto.title;
    }

    if (dto.isCompleted != undefined) {
      result.isCompleted = dto.isCompleted;
    }

    return result;
  }

  return {
    findAll,
    findOne,
    createOne,
    updateOne,
    deleteOne,
  };
}
