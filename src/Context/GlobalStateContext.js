import React, { createContext, useContext, useReducer } from 'react';

const GlobalStateContext = createContext();

const INIT_CONFIG = 'INIT_CONFIG';
const INIT_ACTIVITIES = 'INIT_ACTIVITIES';
// const COLUMN_TASK_UPDATE = 'COLUMN_TASK_UPDATE';

const initialState = {
  configData: null,
  activities: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case INIT_CONFIG:
      return {
        ...state,
        configData: action.payload,
      };
    case INIT_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
// Define action creators
export const initConfig = (data) => ({
  type: INIT_CONFIG,
  payload: data,
});

export const initActivities = (data) => ({
  type: INIT_ACTIVITIES,
  payload: data,
});

// export const columnTaskUpdate = (data) => ({
//   type: COLUMN_TASK_UPDATE,
//   payload: data,
// });
