import { TodosDtoHttp, UpdateTodoDto, UpdateTodoDtoHttp } from './todos.dto.http';
import { HttpCollection, NextHttpResult } from '@/app/shared/http/http';

export function mapTodosCollection(
  dto: NextHttpResult<HttpCollection<TodosDtoHttp>>
): HttpCollection<TodosDtoHttp> {
  return {
    results: dto.data.results,
  };
}

export function mapTodoDtoHttp(dto: UpdateTodoDto): UpdateTodoDtoHttp {
  const result: UpdateTodoDtoHttp = {};

  if (dto.title != undefined) {
    result.title = dto.title;
  }

  if (dto.isCompleted != undefined) {
    result.isCompleted = dto.isCompleted;
  }

  return result;
}
