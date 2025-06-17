import { CollectionHttp } from '@/src/dtos/todo.dto.http';
import { CreateTodoDto, CreateTodoResponseDto, TodosDto, UpdateTodoDto } from '@/src/dtos/todo.dto';
import { HttpOptions, HttpResponse } from '@/lib/http/http-client';

export interface TodosRepository {
  findAll(options?: HttpOptions): Promise<HttpResponse<CollectionHttp<TodosDto>>>;
  findOne(id: number, options?: HttpOptions): Promise<HttpResponse<TodosDto>>;
  createOne(
    todo: CreateTodoDto,
    options?: HttpOptions
  ): Promise<HttpResponse<CreateTodoResponseDto>>;
  updateOne(updateTodo: UpdateTodoDto, options?: HttpOptions): Promise<HttpResponse<void>>;
  deleteOne(todoId: number, options?: HttpOptions): Promise<HttpResponse<void>>;
}
