'use client';

import { useState } from 'react';

import { LoginDto, LoginResponseDto } from '@/src/dtos/auth.dto';
import { safeFetchJson } from '@/lib/http/safe-json';
import { HttpResponse } from '@/lib/http/http-client';

type LoginState = {
  loading: boolean;
};

export const useLogin = () => {
  const [state, setState] = useState<LoginState>({ loading: false });

  async function login(data: LoginDto): Promise<HttpResponse<LoginResponseDto>> {
    setState({ loading: true });

    const fetchJsonResult = await safeFetchJson<LoginResponseDto>('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!fetchJsonResult.ok) {
      setState({ loading: false });
      return fetchJsonResult;
    }

    setState({ loading: false });
    return fetchJsonResult;
  }

  return { ...state, login };
};
