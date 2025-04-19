import { ActionTypes } from '@Context/ActionTypes';

export const Actions = {
  initConfig: (data) => ({
    type: ActionTypes.INIT_CONFIG,
    payload: data,
  }),
  initActivities: (data) => ({
    type: ActionTypes.INIT_ACTIVITIES,
    payload: data,
  }),
  columnTaskUpdate: (startColumnId, finishColumnId, taskId) => ({
    type: ActionTypes.COLUMN_TASK_UPDATE,
    payload: { startColumnId, finishColumnId, taskId },
  }),
  columnTaskSort: (startColumnId, sourceIdx, destinationIdx) => ({
    type: ActionTypes.COLUMN_TASK_SORT,
    payload: { startColumnId, sourceIdx, destinationIdx },
  }),
  deleteTag: (impactedData, tagId) => ({
    type: ActionTypes.DELETE_TAG,
    payload: { impactedData, tagId }, // Tag object to be deleted
  }),
  createTag: (tag) => ({
    type: ActionTypes.CREATE_TAG,
    payload: { tag }, // New tag object
  }),
  deleteActivity: (activityId) => ({
    type: ActionTypes.DELETE_ACTIVITY,
    payload: { activityId },
  }),
  initProjects: (data) => ({
    type: ActionTypes.INIT_PROJECTS,
    payload: data,
  }),
  /**
   * @param {Boolean} isOpen - <true || false> value to manage modal's state;
   * @param {String} activityId - The ID of the activity. If not passed, defaults to null;
   * @param {String} dayId - The identifier of a day is the modal is being opened from an activity card or a scheduleViewCol. If not passed, defaults to null;
   * @returns {void}
   */
  toggleActivityModal: (isOpen, activityId = null, dayId = null, inProject = false) => ({
    type: ActionTypes.TOGGLE_ACTIVITY_MODAL,
    payload: { isOpen, activityId, dayId, inProject },
  }),
  createActivity: (activityPayload) => ({
    type: ActionTypes.CREATE_ACTIVITY,
    payload: activityPayload,
  }),
  toggleProjectsModal: (isOpen) => ({
    type: ActionTypes.TOGGLE_PROJECTS_MODAL,
    payload: { isOpen },
  }),
  /**
   *
   * Sets the status of a project;
   * @param {string} id
   * @param {string} newState
   * @returns {{payload: string, type: string}}
   */
  setProjectStatus: (id, newState) => ({
    type: ActionTypes.SET_PROJECT_STATUS,
    payload: { id, newState },
  }),
  createProject: (project) => ({
    type: ActionTypes.CREATE_PROJECT,
    payload: { project },
  }),
  setActivity: (activity) => ({
    type: ActionTypes.SET_ACTIVITY,
    payload: { activity },
  }),
  deleteProject: (projectId) => ({
    type: ActionTypes.DELETE_PROJECT,
    payload: { projectId },
  }),
  setSelectedProject: (project) => ({
    type: ActionTypes.SET_SELECTED_PROJECT,
    payload: { project },
  }),
  updateProjectActivity: (projectId, activityId) => ({
    type: ActionTypes.UPDATE_PROJECT_ACTIVITY,
    payload: { projectId, activityId },
  }),
  editTag: (updatedTag) => ({
    type: ActionTypes.EDIT_TAG,
    payload: updatedTag,
  }),
};
