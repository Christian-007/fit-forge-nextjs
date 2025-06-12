'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { TopbarConfig } from '@/app/shared/components';
import { TopbarConfigSetter } from '@/app/shared/components/topbar/topbar-config-setter';
import { AuthRepository } from '@/app/core/auth.repository';
import { AuthRepositoryHttp } from '@/app/data/auth/auth.repository.http';

const topbarConfig: TopbarConfig = {
  center: 'Profile',
};

const authRepository: AuthRepository = AuthRepositoryHttp();

export default function Page() {
  const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false);
  const router = useRouter();

  const logout = async () => {
    setIsLogoutLoading(true);
    try {
      await authRepository.logout();
      setIsLogoutLoading(false);
      router.push('/login');
    } catch (error) {
      setIsLogoutLoading(false);
    }
  };

  const handleClickLogout = () => {
    logout();
  };

  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div className="flex h-full flex-col justify-center px-8 py-4">
        <div className="space-y-2">
          <div className="font-semibold">Full name</div>
          <div className="text-sm text-[#96C4A8]">John</div>
        </div>
        <div className="mt-8 space-y-2">
          <div className="font-semibold">Email</div>
          <div className="text-sm text-[#96C4A8]">john@gm.com</div>
        </div>
        <div className="mt-10">
          <button
            onClick={handleClickLogout}
            className="block w-full rounded-full bg-[#29382E] p-4 text-center text-[16px] font-bold hover:opacity-70"
          >
            {isLogoutLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </>
  );
}
