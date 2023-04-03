import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import useInterval from '~/hooks/useInterval';
import request from '~/helpers/axios';
import { useRouter } from 'next/router';

interface IUser {
  username?: string;
  password?: string;
}

interface UserContextType {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

type Props = {
  children: ReactNode;
};

const AuthContext = React.createContext<UserContextType | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: Props) => {
  const { user = {}, error, isLoading } = useUser();

  const router = useRouter();

  const signin = async (info: IUser) => {
    router.push('/api/auth/login');
  };

  const signout = () => {
    router.push('/api/auth/logout');
  };

  return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>;
};
