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
 * @param locale {React.hook} - useTranslation
 */
export const handleActivityCreate = async (dispatch, activity, locale) => {
  await createActivity(dispatch, activity, locale);
};

/**
 *
 * @param dispatch {React.Context}
 * @param activityId {String} - The ID of the activity to delete
 * @param locale {React.hook} - useTranslation
 */
export const handleActivityDelete = async (dispatch, activityId, locale) => {
  await deleteActivity(dispatch, activityId, locale);
};

/**
 * TODO: This should only provide activityId + 'dirty' data
 * @param dispatch {React.Context}
 * @param activity {Object}
 * @param locale {React.hook} - useTranslation
 * */
export const handleActivityUpdate = async (dispatch, activity, locale) => {
  await updateActivity(dispatch, activity, locale);
};
