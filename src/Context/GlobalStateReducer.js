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
      console.log('payload', action.payload);
      const activities = new Map(action.payload.map((item) => [item.id, item]));
      console.log('dataMap ->', ...activities.values());
      console.log('MAP', [...activities.entries()]);
      console.log(activities.get('e428576d'));
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
      console.log(action.payload);
      const { activities, projects } = action.payload.impactedData;
      const tagId = action.payload.tagId;
      projects;
      let updatedActivities = [];

      // Remove the deleted tag from userTags array
      const updatedUserTags = state.configData.userTags.filter((tag) => tag.id !== tagId);

      if (activities.length > 0) {
        updatedActivities = state.activities.map((activity) => {
          if (activity.tag === tagId) {
            return {
              ...activity,
              tag: null,
            };
          }
          return activity;
        });
      }
      // Update activities to remove the deleted tag id
      // const updatedActivities = state.activities.map((activity) => {
      //   if (activity.tag === action.payload.id) {
      //     return {
      //       ...activity,
      //       tag: null, // Remove the tag id from the activity
      //     };
      //   }
      //   return activity;
      // });

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
      const { activities, scheduleColumns } = action.payload;
      console.log('activities', activities);
      console.log('schedule columns', scheduleColumns);
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

      console.log('updated state', updatedState);

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
    case ActionTypes.SET_PROJECT_STATE: {
      const { id, newState } = action.payload;
      const projectIndex = state.projects.findIndex((p) => p.projectId === id);
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
      console.log('project', project);
      const updatedProjects = [...state.projects, project];
      const updatedState = {
        ...state,
        projects: updatedProjects,
      };
      return updatedState;
    }
    case ActionTypes.SET_ACTIVITY: {
      const updatedActivities = state.activities.map((a) =>
        a.id === action.payload.activity.id ? action.payload.activity : a
      );

      return {
        ...state,
        activities: updatedActivities,
      };
    }
    case ActionTypes.DELETE_PROJECT: {
      console.log('deleting your project');
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
