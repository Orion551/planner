import React, { createContext, useContext, useReducer } from 'react';

const GlobalStateContext = createContext();

const INIT_CONFIG = 'INIT_CONFIG';
const INIT_ACTIVITIES = 'INIT_ACTIVITIES';
const COLUMN_TASK_UPDATE = 'COLUMN_TASK_UPDATE';

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
    case COLUMN_TASK_UPDATE: {
      const { startColumnId, finishColumnId, taskId } = action.payload;

      // Find start and finish columns in state
      const startColumn = state.configData.scheduleColumns.find(
        (column) => column.columnId === startColumnId
      );
      const finishColumn = state.configData.scheduleColumns.find(
        (column) => column.columnId === finishColumnId
      );

      // Remove taskId from startColumn and add it to finishColumn
      const newStartTaskIds = startColumn.columnTaskIds.filter((id) => id !== taskId);
      const newFinishTaskIds = [...finishColumn.columnTaskIds, taskId];

      // Update columns with new task ids
      const updatedColumns = state.configData.scheduleColumns.map((column) => {
        if (column.columnId === startColumnId) {
          return { ...column, columnTaskIds: newStartTaskIds };
        }
        if (column.columnId === finishColumnId) {
          return { ...column, columnTaskIds: newFinishTaskIds };
        }
        return column;
      });

      // Update state with new columns
      const updatedPlannerConfig = {
        ...state.configData,
        scheduleColumns: updatedColumns,
      };

      return {
        ...state,
        configData: updatedPlannerConfig,
      };
    }
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

export const columnTaskUpdate = (startColumnId, finishColumnId, taskId) => ({
  type: COLUMN_TASK_UPDATE,
  payload: { startColumnId, finishColumnId, taskId },
});
