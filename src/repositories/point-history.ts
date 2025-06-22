import { PointTransactionEntity } from '@/src/entities/point.entity';
import { FindAllPointHistoryQueryParams, Pagination } from '@/src/dtos/point.dto';
import { HttpOptions, HttpResponse } from '@/lib/http/http-client';

export interface PointHistoryRepository {
  findAllWithPagination(
    queryParams: FindAllPointHistoryQueryParams,
    options?: HttpOptions
  ): Promise<HttpResponse<Pagination<PointTransactionEntity[]>>>;
}
