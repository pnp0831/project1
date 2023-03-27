import React, { ReactNode, useContext, useState } from 'react';

interface IUser {
  name?: string;
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
  const [user, setUser] = useState<IUser>({
    name: '',
  });

  const signin = (user: IUser) => {
    setUser(user);
  };

  const signout = () => {
    setUser({});
  };

  return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>;
};
