import { Actions } from '@Context/Actions';
import {
  createActivity,
  deleteActivity,
  updateActivity,
} from '@Context/ActionHandlers/HandleActivity';

// TODO: This should common handle functions for ActivityModal and ProjectModal

export const handleActivityModalClose = (dispatch) => {
  dispatch(Actions.toggleActivityModal(false));
};

/**
 * @param dispatch {React.Context}
 * @param activity {Object}
 */
export const handleActivityCreate = async (dispatch, activity) => {
  await createActivity(dispatch, activity);
};

/**
 *
 * @param dispatch {React.Context}
 * @param activityId {String} - The ID of the activity to delete
 * @returns {Promise<void>}
 */
export const handleActivityDelete = async (dispatch, activityId) => {
  await deleteActivity(dispatch, activityId);
};

/**
 * TODO: This should only provide activityId + 'dirty' data
 * @param dispatch {React.Context}
 * @param activity {Object}
 */
export const handleActivityUpdate = async (dispatch, activity) => {
  dispatch;
  console.log('activity', activity);
  await updateActivity(dispatch, activity);
};
