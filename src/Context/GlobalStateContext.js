import React, { createContext, useContext, useReducer } from 'react';
import { GlobalStateReducer } from '@Context/GlobalStateReducer';

const AppInitialState = {};

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const { state, dispatch } = useReducer(GlobalStateReducer, AppInitialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
