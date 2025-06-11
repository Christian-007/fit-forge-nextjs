export interface TodosDtoHttp {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface UpdateTodoDto {
  id: number;
  title?: string;
  isCompleted?: boolean;
}

export interface UpdateTodoDtoHttp {
  title?: string;
  isCompleted?: boolean;
}
