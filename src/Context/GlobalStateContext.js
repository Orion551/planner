import React, { createContext, useContext, useReducer } from 'react';

// TODO: Fix that mess;
const GlobalStateContext = createContext();

const INIT_CONFIG = 'INIT_CONFIG';
const INIT_ACTIVITIES = 'INIT_ACTIVITIES';
const COLUMN_TASK_UPDATE = 'COLUMN_TASK_UPDATE';
const COLUMN_TASK_SORT = 'COLUMN_TASK_SORT';
const SET_TAG_COLOR = 'SET_TAG_COLOR';
const UPDATE_TAG_NAME = 'UPDATE_TAG_NAME';

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
    case COLUMN_TASK_SORT: {
      /**
       * destinationIdx: 0
       * sourceIdx: 1
       * startColumnId: "Thursday"
       */
      const { startColumnId, sourceIdx, destinationIdx } = action.payload;
      console.log('start col id', startColumnId);
      console.log('source idx', sourceIdx);
      console.log('destination idx', destinationIdx);

      const column = state.configData.scheduleColumns.find(
        (column) => column.columnId === startColumnId
      );
      const newTaskIds = Array.from(column.columnTaskIds);
      const [removedTask] = newTaskIds.splice(sourceIdx, 1);
      newTaskIds.splice(destinationIdx, 0, removedTask);

      const updatedColumn = {
        ...column,
        columnTaskIds: newTaskIds,
      };

      const updatedColumns = state.configData.scheduleColumns.map((col) =>
        col.columnId === startColumnId ? updatedColumn : col
      );

      const updatedPlannerConfig = {
        ...state.configData,
        scheduleColumns: updatedColumns,
      };

      return {
        ...state,
        configData: updatedPlannerConfig,
      };
    }
    case SET_TAG_COLOR:
      return {
        ...state,
        configData: {
          ...state.configData,
          userTags: state.configData.userTags.map((tag) => {
            if (tag.id === action.payload.selectedTag.id) {
              return {
                ...tag,
                tagColorId: action.payload.color.id,
              };
            }
            return tag;
          }),
        },
      };
    case UPDATE_TAG_NAME:
      return {
        ...state,
        configData: {
          ...state.configData,
          userTags: state.configData.userTags.map((tag) => {
            if (tag.id === action.payload.selectedTag.id) {
              return {
                ...tag,
                tagName: action.payload.newName,
              };
            }
            return tag;
          }),
        },
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

export const columnTaskUpdate = (startColumnId, finishColumnId, taskId) => ({
  type: COLUMN_TASK_UPDATE,
  payload: { startColumnId, finishColumnId, taskId },
});

export const columnTaskSort = (startColumnId, sourceIdx, destinationIdx) => ({
  type: COLUMN_TASK_SORT,
  payload: { startColumnId, sourceIdx, destinationIdx },
});

export const setTagColor = (selectedTag, color) => ({
  type: SET_TAG_COLOR,
  payload: { selectedTag, color },
});

export const updateTagName = (selectedTag, newName) => ({
  type: UPDATE_TAG_NAME,
  payload: { selectedTag, newName },
});
