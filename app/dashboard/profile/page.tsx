'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

import { TopbarConfig } from '@/app/shared/components';
import { TopbarConfigSetter } from '@/app/shared/components/topbar/topbar-config-setter';
import { AuthRepository } from '@/app/core/auth.repository';
import { AuthRepositoryHttp } from '@/app/data/auth/auth.repository.http';
import { UsersRepository } from '@/app/core/repositores/users.repository';
import { UsersRepositoryHttp } from '@/app/data/users/users.repository.http';
import { UserProfileDtoHttp } from '@/app/data/users/user.dto.http';
import { LoadingIndicator } from '@/app/login/components/loading/loading';

const topbarConfig: TopbarConfig = {
  center: 'Profile',
};

const authRepository: AuthRepository = AuthRepositoryHttp();
const usersRepository: UsersRepository = UsersRepositoryHttp();

export default function Page() {
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserProfileDtoHttp>();
  const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsProfileLoading(true);
    try {
      const res = await usersRepository.getProfile();
      setUserProfile(res);
      setIsProfileLoading(false);
    } catch (error) {
      console.log('fetchProfile error: ', error);
      setIsProfileLoading(false);
    }
  };

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
