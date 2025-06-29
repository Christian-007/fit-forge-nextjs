import { safeFetchJson } from '@/lib/http/safe-json';
import { CollectionHttp } from '@/src/dtos/todo.dto.http';
import { CreateTodoDto, CreateTodoResponseDto, TodosDto, UpdateTodoDto } from '@/src/dtos/todo.dto';

export async function fetchAllTodos(): Promise<TodosDto[]> {
  const fetchJsonResult = await safeFetchJson<CollectionHttp<TodosDto>>(`/api/todos`, {
    method: 'GET',
  });
  if (!fetchJsonResult.ok) throw new Error(fetchJsonResult.error);
  return (fetchJsonResult.body as CollectionHttp<TodosDto>).results;
}

export async function fetchOneTodo(todoId: number): Promise<TodosDto> {
  const fetchJsonResult = await safeFetchJson<TodosDto>(`/api/todos/${todoId}`, {
    method: 'GET',
  });
  if (!fetchJsonResult.ok) throw new Error(fetchJsonResult.error);
  return fetchJsonResult.body as TodosDto;
}

export async function createOneTodo(newTodo: CreateTodoDto): Promise<CreateTodoResponseDto> {
  const fetchJsonResult = await safeFetchJson<CreateTodoResponseDto>('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ title: newTodo.title }),
  });
  if (!fetchJsonResult.ok) throw new Error(fetchJsonResult.error);
  return fetchJsonResult.body as CreateTodoResponseDto;
}

export async function updateOneTodo(editTodo: UpdateTodoDto): Promise<void> {
  const fetchJsonResult = await safeFetchJson<void>(`/api/todos/${editTodo.id}`, {
    method: 'PATCH',
    body: JSON.stringify(editTodo),
  });
  if (!fetchJsonResult.ok) throw new Error(fetchJsonResult.error);
}

export async function deleteOneTodo(todoId: number): Promise<void> {
  const fetchJsonResult = await safeFetchJson<void>(`/api/todos/${todoId}`, {
    method: 'DELETE',
  });
  if (!fetchJsonResult.ok) throw new Error(fetchJsonResult.error);
}
