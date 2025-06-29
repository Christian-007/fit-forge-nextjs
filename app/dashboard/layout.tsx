import { BottomBar } from '@/app/_shared/components';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BottomBar />
    </>
  );
}
