import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import useInterval from '~/hooks/useInterval';
import request from '~/helpers/axios';

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
  const { data: session, status } = useSession();

  // const getAuth = async () => {
  //   console.log('getauth');
  //   const a = await request.get('/api/auth/session');
  // };

  // useEffect(() => {
  //   // getAuth();
  // }, []);

  // useInterval(getAuth, 10000);

  const { user = {} } = session || {};

  const signin = async (info: IUser) => {
    signIn('credentials', {
      ...info,
      email: info.username,
      redirect: false,
    });
  };

  const signout = () => {
    signOut({ redirect: false });
  };

  return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>;
};
