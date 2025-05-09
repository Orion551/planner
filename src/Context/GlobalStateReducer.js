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
      const newProjects = state.projects;

      if (activities.length > 0) {
        activities.forEach((activity) => {
          newActivities.set(activity.id, { ...activity, tag: null });
        });
      }
      // TODO: Projects should be stored in Map instead of simple array of objects
      if (projects.length > 0) {
        projects.forEach((project) => {
          newProjects.find((p) => {
            if (p.id === project.id)
              return { ...p, projectTags: p.projectTags.splice(p.projectTags.indexOf(tagId), 1) };
          });
        });
      }

      return {
        ...state,
        configData: {
          ...state.configData,
          userTags: updatedUserTags,
        },
        activities: newActivities,
        projects: newProjects,
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
          inProject: action.payload.inProject,
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

      const updatedProjects = state.projects.map((project) => ({
        ...project,
        projectActivities: project.projectActivities.filter((id) => id !== activityId),
      }));

      // Return the updated state object
      return {
        ...state,
        configData: {
          ...state.configData,
          scheduleColumns: updatedColumns,
        },
        projects: updatedProjects,
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

      const updatedProjects = state.projects.map((project) => {
        // Check if the activities have been attached to any project
        const relatedActivities = activities.filter((activity) => activity.project === project.id);

        if (relatedActivities.length > 0) {
          return {
            ...project,
            projectActivities: [
              ...project.projectActivities,
              ...relatedActivities.map((a) => a.id),
            ],
          };
        }

        return project;
      });

      // New immutable state copy
      const updatedColumns = state.configData.scheduleColumns.map((column) => {
        // Find whether the column is present in the scheduleColumns returned by be
        const matchingScheduleColumn = scheduleColumns.find(
          (scheduleColumn) => scheduleColumn.column_id === column.columnId
        );

        // If there's a hit, let's update columnTaskIds
        if (matchingScheduleColumn) {
          return {
            ...column,
            columnTaskIds: [...column.columnTaskIds, matchingScheduleColumn.activityId],
          };
        }

        // No change, return the original column
        return column;
      });

      // Create a copy of the state object and update the relevant properties
      return {
        ...state,
        configData: {
          ...state.configData,
          scheduleColumns: updatedColumns,
        },
        activities: newActivities,
        projects: updatedProjects,
        activityModal: {
          isActivityModalOpen: false,
        },
      };
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
        projectsModal: {
          isProjectsModalOpen: false,
        },
      };
      return updatedState;
    }
    case ActionTypes.SET_ACTIVITY: {
      const updatedActivity = action.payload.activity;
      const activityId = updatedActivity.id;

      const prevActivity = state.activities.get(activityId);
      const prevProjectId = prevActivity?.project;
      const newProjectId = updatedActivity.project;

      // Remove activity from old project if it changed
      if (prevProjectId && prevProjectId !== newProjectId) {
        state.projects = state.projects.map((project) => {
          if (project.id === prevProjectId) {
            return {
              ...project,
              projectActivities: project.projectActivities.filter((id) => id !== activityId),
            };
          }
          return project;
        });
      }

      // Add the activity to the new project if not already present
      if (newProjectId) {
        state.projects = state.projects.map((project) => {
          if (project.id === newProjectId && !project.projectActivities.includes(activityId)) {
            return {
              ...project,
              projectActivities: [...project.projectActivities, activityId],
            };
          }
          return project;
        });
      }

      // Update the activity
      state.activities.set(activityId, updatedActivity);

      return {
        ...state,
        activities: state.activities,
        projects: state.projects,
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
