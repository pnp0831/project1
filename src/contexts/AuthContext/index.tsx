import React, { ReactNode, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';

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

  const { user = {} } = session || {};

  const signin = async (info: IUser) => {
    signIn('credentials', {
      ...info,
      redirect: false,
    });
  };

  const signout = () => {
    signOut({ redirect: false });
  };

  return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>;
};
