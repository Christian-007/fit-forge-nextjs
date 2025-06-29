import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { TodosDto } from '@/src/dtos/todo.dto';

type TodoItemProps = {
  todo: TodosDto;
  handleOnChangeFn: (event: React.ChangeEvent<HTMLInputElement>, todoId: number) => void;
  handleOnClickOptionFn: (todoId: number) => void;
};

export function TodoItem({ todo, handleOnChangeFn, handleOnClickOptionFn }: TodoItemProps) {
  return (
    <div key={todo.id} className="grid grid-cols-[1fr_24px] items-center gap-6 space-x-4">
      <label className="peer grid grid-cols-[auto_1fr] items-center gap-3 rounded-md px-2 hover:bg-gray-100 dark:hover:bg-white/5">
        <input
          className="peer size-3.5 appearance-none rounded-sm border border-[#366347] accent-[#38E078] checked:appearance-auto"
          type="checkbox"
          onChange={(e) => handleOnChangeFn(e, todo.id)}
          checked={todo.isCompleted}
        />
        <span className="select-none text-gray-700 peer-checked:text-gray-400 peer-checked:line-through dark:text-gray-300">
          {todo.title}
        </span>
      </label>
      <button
        className="peer-has-checked:hidden size-[26px] rounded-md p-1 hover:bg-white/5"
        onClick={() => handleOnClickOptionFn(todo.id)}
      >
        <EllipsisVerticalIcon className="size-5 text-white" />
      </button>
    </div>
  );
}
