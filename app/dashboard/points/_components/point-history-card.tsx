import {
  CheckCircleIcon,
  CurrencyDollarIcon,
  PuzzlePieceIcon,
  QuestionMarkCircleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid';
import { PointType } from '@/src/dtos/point.dto';

type PointHistoryCardProps = {
  title: PointType;
  subtitle: string;
  points: number;
};

export function PointHistoryCard({ title, subtitle, points }: PointHistoryCardProps) {
  const capitalize = (title?: string) => {
    if (!title) return;
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const formatSubtitle = (subtitle?: string) => {
    if (!subtitle) return;
    const format = subtitle.split('_').join(' ');
    return capitalize(format);
  };

  const renderIcon = (title: PointType) => {
    if (title === PointType.TodoCompleted) {
      return <CheckCircleIcon className="size-5 text-center text-white" />;
    }
    if (title === PointType.TodoCreated) {
      return <PuzzlePieceIcon className="size-5 text-center text-white" />;
    }
    if (title === PointType.UserRegistration) {
      return <UserPlusIcon className="size-5 text-center text-white" />;
    }
    if (title === PointType.SubscriptionDeduction) {
      return <CurrencyDollarIcon className="size-5 text-center text-white" />;
    }
    return <QuestionMarkCircleIcon className="size-5 text-center text-white" />;
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-[#264533]">
            {renderIcon(title)}
          </div>
          <div className="flex flex-col">
            <p className="font-medium">{capitalize(title)}</p>
            <p className="text-sm text-[#96c5a8]">{formatSubtitle(subtitle)}</p>
          </div>
        </div>
        <div className="shrink-0">
          <div className="text-center">{points > 0 ? `+${points}` : points}</div>
        </div>
      </div>
    </>
  );
}
