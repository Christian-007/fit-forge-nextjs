'use client';

import { useState } from 'react';

import { AuthRepository } from '@/app/core/auth.repository';
import { AuthEntity } from '@/app/core/auth.entity';
import { Result } from '@/app/shared/http/http';

type LoginState = {
  loading: boolean;
};

export const useLogin = (authRepository: AuthRepository) => {
  const [state, setState] = useState<LoginState>({ loading: false });

  async function login(data: AuthEntity): Promise<Result<null>> {
    setState({ loading: true });

    try {
      await authRepository.login(data);
      setState({ loading: false });
      return [null, null];
    } catch (err: any) {
      setState({ loading: false });
      return [null, err];
    }
  }

  return { ...state, login };
};
