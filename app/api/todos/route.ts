import { createTodoHandler } from '@/src/handlers/todo.handler';
import { TodosRepositoryHttp } from '@/src/repositories/todos.repository.http';

const handler = createTodoHandler({
  todoRepository: TodosRepositoryHttp(),
});

export async function GET() {
  return handler.getAllTodos();
}

export async function POST(request: Request) {
  return handler.createOneTodo(request);
}
