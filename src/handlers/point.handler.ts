import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import { PointHistoryRepository } from '@/src/repositories/point-history';
import { FindAllPointHistoryQueryParams } from '@/src/dtos/point.dto';

export type PointHandlerOptions = {
  pointHistoryRepository: PointHistoryRepository;
};

export function createPointHandler(options: PointHandlerOptions) {
  const { pointHistoryRepository } = options;

  async function getPointHistoryWithPagination(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    console.log('searchparams: ', searchParams);
    const queryParams: FindAllPointHistoryQueryParams = {
      limit: searchParams.get('limit') as string,
      offset: searchParams.get('offset') as string,
    };

    const token = cookies().get('token')?.value;
    const res = await pointHistoryRepository.findAllWithPagination(queryParams, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.log('NOT OK: ', res);
      return Response.json({ error: res.error }, { status: res.status });
    }

    return Response.json(res.body, { status: res.status });
  }

  return {
    getPointHistoryWithPagination,
  };
}
