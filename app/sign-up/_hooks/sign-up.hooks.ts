'use client';

import { useState } from 'react';

import { safeFetchJson } from '@/lib/http/safe-json';
import { CreateUserDto } from '@/src/dtos/users.dto';

type CreateUserState = {
  loading: boolean;
  error: string | null;
  success: boolean;
};

export const useUsers = () => {
  const [state, setState] = useState<CreateUserState>({
    loading: false,
    error: null,
    success: false,
  });

  async function createOneUser(formData: CreateUserDto): Promise<string | undefined> {
    setState({
      loading: true,
      error: null,
      success: false,
    });

    const fetchJsonResult = await safeFetchJson<void>('/api/users', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    if (!fetchJsonResult.ok) {
      setState({
        loading: false,
        success: false,
        error: fetchJsonResult.error ?? 'Something went wrong',
      });
      return fetchJsonResult.error;
    }

    setState({ loading: false, error: null, success: true });
    return undefined;
  }

  return {
    ...state,
    createOneUser,
  };
};
