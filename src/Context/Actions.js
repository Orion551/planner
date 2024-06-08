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
  setTagColor: (selectedTag, color) => ({
    type: ActionTypes.SET_TAG_COLOR,
    payload: { selectedTag, color },
  }),
  updateTagName: (selectedTag, newName) => ({
    type: ActionTypes.UPDATE_TAG_NAME,
    payload: { selectedTag, newName },
  }),
  deleteTag: (tag) => ({
    type: ActionTypes.DELETE_TAG,
    payload: tag, // Tag object to be deleted
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
  toggleActivityModal: (isOpen, activityId = null, dayId = null) => ({
    type: ActionTypes.TOGGLE_ACTIVITY_MODAL,
    payload: { isOpen, activityId, dayId },
  }),
  createActivity: (activityPayload) => ({
    type: ActionTypes.CREATE_ACTIVITY,
    payload: { activityPayload },
  }),
  toggleProjectsModal: (isOpen) => ({
    type: ActionTypes.TOGGLE_PROJECTS_MODAL,
    payload: { isOpen },
  }),
  /**
   *
   * Sets the status of a project or an activity. Based on context
   * @param {string} id
   * @param {string} context
   * @param {string} newState
   * @returns {{payload: string, type: string}}
   */
  setState: (id, context, newState) => ({
    type: ActionTypes.SET_STATE,
    payload: { id, context, newState },
  }),
  createProject: (project) => ({
    type: ActionTypes.CREATE_PROJECT,
    payload: { project },
  }),
  setActivityStatus: (activityId, activityStatus) => ({
    type: ActionTypes.SET_ACTIVITY_STATUS,
    payload: { activityId, activityStatus },
  }),
  deleteProject: (projectId) => ({
    type: ActionTypes.DELETE_PROJECT,
    payload: { projectId },
  }),
  setSelectedProject: (project) => ({
    type: ActionTypes.SET_SELECTED_PROJECT,
    payload: { project },
  }),
};
