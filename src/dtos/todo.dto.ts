export interface TodosDto {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface UpdateTodoDto {
  id: number;
  title?: string;
  isCompleted?: boolean;
}

export interface CreateTodoDto {
  title: string;
}

export interface PointsChangeDto {
  total: number;
  change: number;
}

export interface CreateTodoResponseDto {
  id: number;
  title: string;
  isCompleted: boolean;
  points: PointsChangeDto;
}
