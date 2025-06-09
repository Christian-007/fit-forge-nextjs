import { TodosDtoHttp } from '@/app/data/todos/todos.dto.http';
import { HttpCollection } from '@/app/shared/http/http';

export interface TodosRepository {
  findAll(): Promise<HttpCollection<TodosDtoHttp>>;
}
