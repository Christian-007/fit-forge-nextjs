'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

import { TopbarConfig } from '@/app/_shared/components';
import { TopbarConfigSetter } from '@/app/_shared/components/topbar/topbar-config-setter';
import { LoadingIndicator } from '@/app/login/_components/loading/loading';
import { safeFetchJson } from '@/lib/http/safe-json';
import { UserProfileDto } from '@/src/dtos/users.dto';

const topbarConfig: TopbarConfig = {
  center: 'Profile',
};

export default function Page() {
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserProfileDto>();
  const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsProfileLoading(true);
    const fetchJsonResult = await safeFetchJson<UserProfileDto>(`/api/profile`, {
      method: 'GET',
    });

    if (!fetchJsonResult.ok) {
      setIsProfileLoading(false);
      return;
    }

    setUserProfile(fetchJsonResult.body);
    setIsProfileLoading(false);
  };

  const logout = async () => {
    setIsLogoutLoading(true);
    const res = await safeFetchJson<void>('/api/logout', {
      method: 'POST',
    });
    if (!res.ok) {
      setIsLogoutLoading(false);
      return;
    }

    setIsLogoutLoading(false);
    router.push('/login');
  };

  const handleClickLogout = () => {
    logout();
  };

  const renderMainContent = () => {
    if (isProfileLoading) {
      return (
        <div className="flex h-full flex-col items-center justify-center">
          <div className="px-4 pt-10">
            <h1 className="text-center text-[28px] font-bold">
              <LoadingIndicator text="Loading user profile" />
            </h1>
            <p className="mt-3 text-center">Getting your profile data...</p>
          </div>
        </div>
      );
    }

    if (!userProfile) {
      return (
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex flex-col items-center px-4">
            <ExclamationCircleIcon className="size-16 text-white" />
            <span className="mt-3 text-center">
              There is something wrong with your user profile.
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-center">
        <div className="space-y-2">
          <div className="font-semibold">Full name</div>
          <div className="text-sm text-[#96C4A8]">{userProfile.name}</div>
        </div>
        <div className="mt-8 space-y-2">
          <div className="font-semibold">Email</div>
          <div className="text-sm text-[#96C4A8]">{userProfile.email}</div>
        </div>
        <div className="mt-8 space-y-2">
          <div className="font-semibold">Subscription status</div>
          <div className="text-sm text-[#96C4A8]">{userProfile.subscriptionStatus}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <TopbarConfigSetter config={topbarConfig} />
      <div className="h-full px-8 py-4">
        {renderMainContent()}
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
