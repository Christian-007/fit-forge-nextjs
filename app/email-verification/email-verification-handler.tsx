'use client';

import { useSearchParams } from 'next/navigation';

import { useEmailVerification } from './_hooks/email-verification.hooks';
import { LoadingIndicator } from '../login/_components/loading/loading';

export default function EmailVerificationHandler() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  useEmailVerification(token);

  return <LoadingIndicator text="Verifying Your Email..." />;
}
