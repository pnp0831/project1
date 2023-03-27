import React, { ReactNode, useContext, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
};

const DemonstrationContext = React.createContext();

export const useDemonstrationContext = () => useContext(DemonstrationContext);

export const DemonstrationContextProvider = ({ children }: Props) => {
  const [formValue, setFormValue] = useState({});

  useEffect(() => {}, []);

  return (
    <DemonstrationContext.Provider value={{ formValue, setFormValue }}>
      {children}
    </DemonstrationContext.Provider>
  );
};
