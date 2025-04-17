import React, { createContext, useContext, useReducer } from 'react';
import { GlobalStateReducer } from '@Context/GlobalStateReducer';

const initialState = {
  configData: null,
  activities: [],
  projects: [],
  selectedProject: null,
  activityModal: {
    isActivityModalOpen: false,
    activityId: null,
    dayId: null,
  },
  projectsModal: {
    isProjectsModalOpen: false,
  },
  page: 0,
  rowsPerPage: 15,
};

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
