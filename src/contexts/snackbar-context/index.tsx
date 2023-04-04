import React, { ReactNode, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IApp {
  headers: string[];
  carts: string[];
}

interface ISnackbarContextType {
  messages: { id: string; message: 'string' }[];
}

type Props = {
  children: ReactNode;
};

const SnackbarContext = React.createContext();

export const useSnackbarContext = () => useContext(SnackbarContext);

export const SnackbarContextProvider = ({ children }: Props) => {
  const [messages, setMessages] = useState([]);

  const showMessage = useCallback(
    (message) => {
      setMessages([
        {
          message,
          id: uuidv4(),
        },
        ...messages,
      ]);
    },
    [messages]
  );

  const hideMessage = useCallback(
    (id) => {
      const tmpMessages = [...messages];

      const messageIdx = tmpMessages.findIndex((m) => m.id === id);

      if (messageIdx > -1) {
        tmpMessages.splice(messageIdx, 1);
      }
      setMessages(tmpMessages);
    },
    [messages]
  );

  return (
    <SnackbarContext.Provider value={{ messages, showMessage, hideMessage }}>
      {children}
    </SnackbarContext.Provider>
  );
};
