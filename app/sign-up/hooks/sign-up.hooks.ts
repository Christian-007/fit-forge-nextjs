'use client';

import { useState } from 'react';

import { UserEntity } from '@/app/core/entities/user.entity';
import { UsersRepository } from '@/app/core/repositores/users.repository';
import { Result } from '@/app/shared/http/http';

type CreateUserState = {
  loading: boolean;
  error: string | null;
  success: boolean;
};

export const useUsers = (usersRepository: UsersRepository) => {
  const [state, setState] = useState<CreateUserState>({
    loading: false,
    error: null,
    success: false,
  });

  async function createOneUser(data: UserEntity): Promise<Result<null>> {
    setState({
      loading: true,
      error: null,
      success: false,
    });

    try {
      await usersRepository.create(data);
      setState({ loading: false, error: null, success: true });
      return [null, null];
    } catch (err: any) {
      setState({
        loading: false,
        success: false,
        error: err.message ?? 'Something went wrong',
      });
      return [null, err];
    }
  }

  return {
    ...state,
    createOneUser,
  };
};
