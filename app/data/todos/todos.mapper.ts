import { TodosDtoHttp } from './todos.dto.http';
import { HttpCollection, NextHttpResult } from '@/app/shared/http/http';

export function mapTodosCollection(
  dto: NextHttpResult<HttpCollection<TodosDtoHttp>>
): HttpCollection<TodosDtoHttp> {
  console.log('dto: ', dto);
  return {
    results: dto.data.results,
  };
}
