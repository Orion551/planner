import { ActionTypes } from '@Context/ActionTypes';
import { v4 as uuid } from 'uuid';
// eslint-disable-next-line no-unused-vars
import { handleActivityCreate } from '@Context/ActionHandlers/HandleActivityCreate';

export const GlobalStateReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.INIT_CONFIG:
      return {
        ...state,
        configData: action.payload,
      };
    case ActionTypes.INIT_ACTIVITIES: {
      console.log('payload', action.payload);
      const { activities } = action.payload;
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
    case ActionTypes.SET_TAG_COLOR:
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
    case ActionTypes.UPDATE_TAG_NAME:
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
    case ActionTypes.DELETE_TAG: {
      // Remove the deleted tag from userTags array
      const updatedUserTags = state.configData.userTags.filter(
        (tag) => tag.id !== action.payload.id
      );

      // Update activities to remove the deleted tag id
      const updatedActivities = state.activities.map((activity) => {
        if (activity.tag === action.payload.id) {
          return {
            ...activity,
            tag: null, // Remove the tag id from the activity
          };
        }
        return activity;
      });

      return {
        ...state,
        configData: {
          ...state.configData,
          userTags: updatedUserTags,
        },
        activities: updatedActivities,
      };
    }
    case ActionTypes.CREATE_TAG: {
      const { tag } = action.payload;
      console.log('tag', tag);
      // Make a random index;
      const randomIndex = Math.floor(Math.random() * state.configData.tagsPalette.length);
      // Based on the random index, pick a color;
      const randomColor = state.configData.tagsPalette[randomIndex].id;

      // Add the random color to the tag object
      const tagWithColor = { ...tag, tagColorId: randomColor };
      console.log('tag with color', tagWithColor);
      return {
        ...state,
        configData: {
          ...state.configData,
          userTags: [...state.configData.userTags, tagWithColor], // Add new tag to userTags array
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
      // Filter out the activity from the activities array
      const updatedActivities = state.activities.filter((activity) => activity.id !== activityId);
      // Remove the activityId from columnTaskIds for each column where it exists
      const updatedColumns = state.configData.scheduleColumns.map((column) => {
        // Check if the activityId exists in columnTaskIds
        const updatedTaskIds = column.columnTaskIds.filter((taskId) => taskId !== activityId);
        // Return the column object with updated columnTaskIds
        return { ...column, columnTaskIds: updatedTaskIds };
      });
      // Return the updated state object
      return {
        ...state,
        configData: {
          ...state.configData,
          scheduleColumns: updatedColumns,
        },
        activities: updatedActivities,
        activityModal: {
          isActivityModalOpen: false,
        },
      };
    }
    case ActionTypes.CREATE_ACTIVITY: {
      // TODO: this could be improved by separating concerns. This should only create the activity. Then, another handler should update activities[] and scheduleColumns[]
      const { activityPayload } = action.payload;
      const activityId = uuid().slice(0, 8);
      const newActivity = {
        id: activityId,
        activityStatus: 2,
        ...activityPayload,
      };
      // handleActivityCreate(state, activityPayload);

      // Create a copy of the scheduleColumns array to update it immutably
      const updatedColumns = state.configData.scheduleColumns.map((column) => {
        if (activityPayload.selectedColumns.includes(column.columnId)) {
          // Create a copy of the column object to update it immutably
          return {
            ...column,
            // Create a new array with the added activityId
            columnTaskIds: [...column.columnTaskIds, activityId],
          };
        }
        return column;
      });

      // Create a copy of the activities array to update it immutably
      const updatedActivities = [...state.activities, newActivity];

      // Create a copy of the state object and update the relevant properties
      const updatedState = {
        ...state,
        configData: {
          ...state.configData,
          scheduleColumns: updatedColumns,
        },
        activities: updatedActivities,
        activityModal: {
          isActivityModalOpen: false,
        },
      };

      return updatedState;
    }
    case ActionTypes.INIT_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case ActionTypes.TOGGLE_PROJECTS_MODAL:
      return {
        ...state,
        projectsModal: {
          isProjectsModalOpen: action.payload.isOpen,
        },
      };
    case ActionTypes.SET_STATE: {
      const { id, context, newState } = action.payload;
      console.log('id', id);
      console.log('context', context);
      console.log('new state', newState);
      switch (context) {
        case 'project': {
          const projectIndex = state.projects.findIndex((p) => p.projectId === id);
          console.log('p index', projectIndex);
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
        case 'activity': {
          const activityIdx = state.activities.findIndex((a) => a.id === id);
          const updatedActivities = [...state.activities];
          updatedActivities[activityIdx] = {
            ...updatedActivities[activityIdx],
            activityStatus: newState,
          };
          return {
            ...state,
            activities: updatedActivities,
          };
        }
        default:
          return state;
      }
    }
    case ActionTypes.CREATE_PROJECT: {
      const { project } = action.payload;
      console.log('project', project);
      const projectId = uuid().slice(0, 8);
      const newProject = {
        projectId: projectId,
        projectStatus: 2,
        projectCreationDate: Date.now(),
        ...project,
      };
      const updatedProjects = [...state.projects, newProject];
      const updatedState = {
        ...state,
        projects: updatedProjects,
      };
      return updatedState;
    }
    case ActionTypes.SET_ACTIVITY_STATUS: {
      const { activityId, activityStatus } = action.payload;
      return {
        ...state,
        activities: state.activities.map((activity) =>
          activity.id === activityId ? { ...activity, completed: activityStatus } : activity
        ),
      };
    }
    default:
      return state;
  }
};
