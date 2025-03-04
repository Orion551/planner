import { ActionTypes } from '@Context/ActionTypes';

/* TODO: Create global-common handlers to update scheduleColumns/activities/projects.. */

export const GlobalStateReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.INIT_CONFIG:
      return {
        ...state,
        configData: action.payload,
      };
    case ActionTypes.INIT_ACTIVITIES: {
      const activities = new Map(action.payload.map((item) => [item.id, item]));
      return {
        ...state,
        activities: activities,
      };
    }
    case ActionTypes.COLUMN_TASK_UPDATE: {
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
    case ActionTypes.COLUMN_TASK_SORT: {
      /**
       * destinationIdx: 0
       * sourceIdx: 1
       * startColumnId: "Thursday"
       */
      const { startColumnId, sourceIdx, destinationIdx } = action.payload;

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
    case ActionTypes.EDIT_TAG: {
      /**
       * {
       *    "id": "8c96f619",
       *    "tagName": "cotto",
       *    "tagColorId": 0
       * }
       */
      return {
        ...state,
        configData: {
          ...state.configData,
          userTags: state.configData.userTags.map((tag) =>
            tag.id === action.payload.id
              ? { ...tag, tagName: action.payload.tagName, tagColorId: action.payload.tagColorId }
              : tag
          ),
        },
      };
    }
    case ActionTypes.DELETE_TAG: {
      const { activities, projects } = action.payload.impactedData;
      const tagId = action.payload.tagId;
      projects;
      // Remove the deleted tag from userTags array
      const updatedUserTags = state.configData.userTags.filter((tag) => tag.id !== tagId);

      const newActivities = new Map(state.activities);

      if (activities.length > 0) {
        activities.forEach((activity) => {
          newActivities.set(activity.id, { ...activity, tag: null });
        });
      }

      return {
        ...state,
        configData: {
          ...state.configData,
          userTags: updatedUserTags,
        },
        activities: newActivities,
      };
    }
    case ActionTypes.CREATE_TAG: {
      const { tag } = action.payload;
      return {
        ...state,
        configData: {
          ...state.configData,
          userTags: [...state.configData.userTags, tag], // Add new tag to userTags array
        },
      };
    }
    case ActionTypes.TOGGLE_ACTIVITY_MODAL:
      return {
        ...state,
        activityModal: {
          isActivityModalOpen: action.payload.isOpen,
          activityId: action.payload.activityId,
          dayId: action.payload.dayId,
        },
      };
    case ActionTypes.DELETE_ACTIVITY: {
      const { activityId } = action.payload;
      let updatedColumns = state.configData.scheduleColumns;
      if (state.activities.has(activityId)) {
        state.activities.delete(activityId);
        // Remove the activityId from columnTaskIds for each column where it exists
        updatedColumns = state.configData.scheduleColumns.map((column) => {
          // Check if the activityId exists in columnTaskIds
          const updatedTaskIds = column.columnTaskIds.filter((taskId) => taskId !== activityId);
          // Return the column object with updated columnTaskIds
          return { ...column, columnTaskIds: updatedTaskIds };
        });
      }

      // Return the updated state object
      return {
        ...state,
        configData: {
          ...state.configData,
          scheduleColumns: updatedColumns,
        },
        activities: state.activities,
        activityModal: {
          isActivityModalOpen: false,
        },
      };
    }
    case ActionTypes.CREATE_ACTIVITY: {
      const { activities, scheduleColumns } = action.payload;
      const newActivities = new Map(state.activities);
      activities.forEach((activity) => {
        newActivities.set(activity.id, activity);
      });

      // Create a copy of the state object and update the relevant properties
      const updatedState = {
        ...state,
        configData: {
          ...state.configData,
          scheduleColumns: state.configData.scheduleColumns.map((column) => {
            const foundScheduleColumn = scheduleColumns.find((sC) => {
              return sC.columnId === column.columnId;
            });
            if (foundScheduleColumn) {
              return {
                ...column,
                columnTaskIds: foundScheduleColumn.columnTaskIds,
              };
            }
            return column;
          }),
        },
        activities: newActivities,
        activityModal: {
          isActivityModalOpen: false,
        },
      };
      return updatedState;
    }
    case ActionTypes.UPDATE_PROJECT_ACTIVITY: {
      const { projectId, activityId } = action.payload;
      const projectIndex = state.projects.findIndex((p) => p.id === projectId);
      if (projectIndex !== -1) {
        const updatedProjects = [...state.projects];
        const updatedProject = { ...updatedProjects[projectIndex] };
        if (!updatedProject.projectActivities.includes(activityId)) {
          updatedProject.projectActivities = [...updatedProject.projectActivities, activityId];
          updatedProjects[projectIndex] = updatedProject;
        }
        return {
          ...state,
          projects: updatedProjects,
        };
      }
      return state;
    }
    case ActionTypes.INIT_PROJECTS: {
      const projects = action.payload;
      return {
        ...state,
        projects: projects,
      };
    }
    case ActionTypes.TOGGLE_PROJECTS_MODAL:
      return {
        ...state,
        projectsModal: {
          isProjectsModalOpen: action.payload.isOpen,
        },
      };
    case ActionTypes.SET_PROJECT_STATUS: {
      const { id, newState } = action.payload;
      const projectIndex = state.projects.findIndex((p) => p.id === id);
      const updatedProjects = [...state.projects];
      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        projectStatus: newState,
      };
      return {
        ...state,
        projects: updatedProjects,
      };
    }
    case ActionTypes.CREATE_PROJECT: {
      const { project } = action.payload;
      const updatedProjects = [...state.projects, project];
      const updatedState = {
        ...state,
        projects: updatedProjects,
      };
      return updatedState;
    }
    case ActionTypes.SET_ACTIVITY: {
      const activityId = action.payload.activity.id;
      if (state.activities.has(activityId)) {
        state.activities.set(activityId, action.payload.activity);
      }

      return {
        ...state,
        activities: state.activities,
        activityModal: {
          isActivityModalOpen: false,
        },
      };
    }
    case ActionTypes.DELETE_PROJECT: {
      const { projectId } = action.payload;
      const updatedProjects = state.projects.filter((p) => p.id !== projectId);
      return {
        ...state,
        projects: updatedProjects,
      };
    }
    case ActionTypes.SET_SELECTED_PROJECT: {
      const { project } = action.payload;
      return {
        ...state,
        selectedProject: project,
      };
    }
    default:
      return state;
  }
};
