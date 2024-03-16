import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    configData: null,
  });

  return (
    <GlobalStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
