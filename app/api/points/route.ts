import { NextRequest } from 'next/server';

import { createPointHandler } from '@/src/handlers/point.handler';
import { PointHistoryHttp } from '@/src/repositories/point-history.http';

const handler = createPointHandler({
  pointHistoryRepository: PointHistoryHttp(),
});

export async function GET(request: NextRequest) {
  return handler.getPointHistoryWithPagination(request);
}
