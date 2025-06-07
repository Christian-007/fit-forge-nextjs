'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AuthRepository } from '@/app/core/auth.repository';

type DependencyOptions = {
  authRepository: AuthRepository;
};

export const useEmailVerification = (token: string | null, options: DependencyOptions): void => {
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/email-verification/failed');
      return;
    }

    const verify = async (): Promise<void> => {
      const { authRepository } = options;
      try {
        await authRepository.verify(token);
        router.push('/email-verification/success');
      } catch (err: any) {
        console.log('Err: ', err);
        router.push('/email-verification/failed');
      }
    };

    verify();
  }, [token, options]);
};
