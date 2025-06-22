export enum PointType {
  TodoCompleted = 'complete todo',
  TodoCreated = 'created a todo',
  UserRegistration = 'user registration',
  SubscriptionDeduction = 'subscription deduction',
}

export type FindAllPointHistoryQueryParams = Omit<PaginationMeta, 'total'>;

export interface Pagination<T> {
  data: T;
  meta: PaginationMeta;
}

export interface PointsDto {
  id: string;
  transaction_type: 'earn' | 'spend' | 'subscription_deduction' | 'expire';
  points: number;
  reason: PointType;
  created_at: string;
}

interface PaginationMeta {
  total: string;
  limit: string;
  offset: string;
}
