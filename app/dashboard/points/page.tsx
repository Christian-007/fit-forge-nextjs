import { PointHistoryCard, PointType } from './_components/point-history-card';

import { TopbarConfig } from '@/app/shared/components';
import { TopbarConfigSetter } from '@/app/shared/components/topbar/topbar-config-setter';

const topbarConfig: TopbarConfig = {
  center: 'Points',
};

export default function Page() {
  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div className="flex h-full flex-col justify-center py-4">
        <PointHistoryCard id={1} title={PointType.TodoCompleted} subtitle="Earned" points={-10} />
      </div>
    </>
  );
}
