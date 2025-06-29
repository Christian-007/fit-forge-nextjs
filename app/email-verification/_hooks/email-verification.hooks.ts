'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { safeFetchJson } from '@/lib/http/safe-json';

export const useEmailVerification = (token: string | null): void => {
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/email-verification/failed');
      return;
    }

    const verify = async (): Promise<void> => {
      const fetchJsonResult = await safeFetchJson<void>(`/api/verify/${token}`, {
        method: 'POST',
      });
      if (!fetchJsonResult.ok) {
        console.log('error: failed email verification');
        router.push('/email-verification/failed');
      }

      router.push('/email-verification/success');
    };

    verify();
  }, [token, router]);
};
