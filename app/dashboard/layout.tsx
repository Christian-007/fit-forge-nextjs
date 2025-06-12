import { BottomBar } from '@/app/shared/components';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BottomBar />
    </>
  );
}
