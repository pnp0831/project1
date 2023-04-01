import { UserProvider as SessionProvider } from '@auth0/nextjs-auth0/client';
import React, { ReactNode, useContext, useState } from 'react';

interface IApp {
  headers: string[];
  carts: string[];
}

interface IAppContextType {}

type Props = {
  children: ReactNode;
};

const AppContext = React.createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: Props) => {
  const [headers, setHeaders] = useState([]);
  const [title, setTitle] = useState();

  return (
    <SessionProvider>
      <AppContext.Provider value={{ headers, setHeaders, setTitle, title }}>
        {children}
      </AppContext.Provider>
    </SessionProvider>
  );
};
