import {
  CreateTodoDto,
  CreateTodoResponseDto,
  TodosDtoHttp,
  UpdateTodoDto,
} from '@/app/data/todos/todos.dto.http';
import { HttpCollection, NextHttpResult } from '@/app/shared/http/http';

export interface TodosRepository {
  findAll(): Promise<HttpCollection<TodosDtoHttp>>;
  findOne(id: number): Promise<NextHttpResult<TodosDtoHttp | null>>;
  updateOne(updateTodo: UpdateTodoDto): Promise<void>;
  createOne(todo: CreateTodoDto): Promise<CreateTodoResponseDto>;
  deleteOne(todoId: number): Promise<void>;
  createOne(todo: CreateTodoDto): Promise<CreateTodoResponseDto>;
}
