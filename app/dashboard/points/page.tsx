'use client';

import { useEffect, useState } from 'react';
import { PointHistoryCard } from './_components/point-history-card';

import { LoadingIndicator } from '@/app/login/components/loading/loading';
import { TopbarConfig } from '@/app/shared/components';
import { TopbarConfigSetter } from '@/app/shared/components/topbar/topbar-config-setter';
import { PointTransactionEntity } from '@/src/entities/point.entity';
import { Pagination } from '@/src/dtos/point.dto';
import { safeFetchJson } from '@/lib/http/safe-json';

const topbarConfig: TopbarConfig = {
  center: 'Points',
};

export default function Page() {
  const [pointHistories, setPointHistories] = useState<PointTransactionEntity[]>([]);
  const [paginationMeta, setPaginationMeta] = useState<{
    limit: number;
    offset: number;
    total: number;
  }>({
    limit: 10,
    offset: 0,
    total: 0,
  });
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const url = `/api/points?limit=10&offset=0`;
    const fetchJsonResult = await safeFetchJson<Pagination<PointTransactionEntity[]>>(url, {
      method: 'GET',
    });

    if (!fetchJsonResult.ok) {
      console.log('[fetchInitialData] error: ', fetchJsonResult);
      setIsPageLoading(false);
      return;
    }

    const resBody = fetchJsonResult.body as Pagination<PointTransactionEntity[]>;
    console.log('resBody.data: ', resBody.data);
    setIsPageLoading(false);
    setPointHistories(resBody.data);
    setPaginationMeta((prev) => ({
      ...prev,
      total: +resBody.meta.total,
    }));
  };

  const fetchPointHistories = async (limit: number, offset: number) => {
    setIsLoadMoreLoading(true);
    const queryParams = `limit=${limit}&offset=${offset}`;
    const url = `/api/points?${queryParams}`;
    const fetchJsonResult = await safeFetchJson<Pagination<PointTransactionEntity[]>>(url, {
      method: 'GET',
    });

    if (!fetchJsonResult.ok) {
      console.log('[fetchPointHistories] error: ', fetchJsonResult);
      setIsLoadMoreLoading(false);
      return;
    }

    const resBody = fetchJsonResult.body as Pagination<PointTransactionEntity[]>;
    setIsLoadMoreLoading(false);
    setPointHistories((prev) => [...prev, ...resBody.data]);
    setPaginationMeta((prev) => ({
      ...prev,
      limit,
      offset,
      total: +resBody.meta.total,
    }));
  };

  const handleClickLoadMore = () => {
    const { limit, offset } = paginationMeta;
    fetchPointHistories(limit, offset + limit);
  };

  const hasNextPage = (): boolean => {
    return paginationMeta.offset + paginationMeta.limit < paginationMeta.total;
  };

  const renderMainContent = () => {
    if (isPageLoading) {
      return (
        <div className="flex h-full flex-col items-center justify-center">
          <div className="px-4 pt-10">
            <h1 className="text-center text-[28px] font-bold">
              <LoadingIndicator text="Loading point history" />
            </h1>
            <p className="mt-3 text-center">Loading your point history...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col justify-center gap-4 px-5 pb-[95px]">
        {pointHistories?.map((pointHistory: PointTransactionEntity) => (
          <PointHistoryCard
            key={pointHistory.id}
            title={pointHistory.reason}
            subtitle={pointHistory.transactionType}
            points={pointHistory.points}
          />
        ))}
        {hasNextPage() && (
          <button
            disabled={isLoadMoreLoading}
            onClick={handleClickLoadMore}
            className="mt-4 block w-full rounded-full bg-[#38E078] p-2 text-center text-[16px] font-bold text-[#122117] hover:opacity-70"
          >
            {isLoadMoreLoading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      {renderMainContent()}
    </>
  );
}
