import { createTodoHandler } from '@/src/handlers/todo.handler';
import { TodosRepositoryHttp } from '@/src/repositories/todos.repository.http';

const handler = createTodoHandler({
  todoRepository: TodosRepositoryHttp(),
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handler.getOneTodo(+id);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handler.deleteOneTodo(+id);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handler.updateOneTodo(request, +id);
}
