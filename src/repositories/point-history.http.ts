import { PointHistoryRepository } from './point-history';

import { PointTransactionEntity } from '@/src/entities/point.entity';
import { FindAllPointHistoryQueryParams, Pagination, PointsDto } from '@/src/dtos/point.dto';
import { createHttpClient, HttpOptions, HttpResponse } from '@/lib/http/http-client';

const httpClient = createHttpClient();

export function PointHistoryHttp(): PointHistoryRepository {
  const baseUrl: string | undefined = process.env.CORE_API_URL;
  if (!baseUrl) {
    throw new Error('baseUrl is not defined!');
  }

  async function findAllWithPagination(
    queryParams: FindAllPointHistoryQueryParams,
    options?: HttpOptions
  ): Promise<HttpResponse<Pagination<PointTransactionEntity[]>>> {
    const { limit, offset } = queryParams;
    const params = { limit, offset };

    const res = await httpClient.get<Pagination<PointsDto[]>>(`${baseUrl}/point-transactions`, {
      ...options,
      params,
    });
    if (res.ok) {
      const resBody = res.body as Pagination<PointsDto[]>;
      const entity = resBody.data.map(mapToEntity);
      const mappedBody: Pagination<PointTransactionEntity[]> = {
        data: entity,
        meta: resBody.meta,
      };

      return {
        ...res,
        body: mappedBody,
      };
    }

    return {
      ...res,
      body: undefined,
    };
  }

  function mapToEntity(dto: PointsDto): PointTransactionEntity {
    return {
      id: dto.id,
      points: dto.points,
      reason: dto.reason,
      transactionType: dto.transaction_type,
      createdAt: dto.created_at,
    };
  }

  return {
    findAllWithPagination,
  };
}
