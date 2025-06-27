import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import clsx from 'clsx';

import './globals.css';
import { TopbarProvider } from '@/app/shared/components/topbar/topbar.context';
import { Topbar } from '@/app/shared/components';
import { Toaster } from 'react-hot-toast';

const figtree = Figtree({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FitForge',
  description: 'An app for all of your daily fitness needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={clsx(
          figtree.className,
          'flex min-h-screen items-start justify-center bg-[#1D2029] antialiased dark:text-white'
        )}
      >
        <div className="dark flex h-full w-[480px] flex-col overflow-hidden">
          <TopbarProvider>
            <Topbar />
            <div className="min-h-screen bg-[#152119] pt-14">{children}</div>
          </TopbarProvider>
        </div>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
