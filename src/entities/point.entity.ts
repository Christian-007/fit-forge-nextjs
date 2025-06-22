import { PointType } from '@/src/dtos/point.dto';

export interface PointTransactionEntity {
  id: string;
  transactionType: 'earn' | 'spend' | 'subscription_deduction' | 'expire';
  points: number;
  reason: PointType;
  createdAt: string;
}
