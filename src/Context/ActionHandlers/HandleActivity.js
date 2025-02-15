import { deleteRequest, postRequest, putRequest } from '@Api/http-service';
import { ApiUrl } from '@Constants/ApiUrl';
import { Actions } from '@Context/Actions';

/* TODO:
    1. Add error handlers
    2. Implement notifications
*/

export const createActivity = async (dispatch, activityPayload) => {
  /**
   * {
   *     "selectedColumns": ["Thursday", ...],
   *     "activity": {
   *       "title": "ciao",
   *       "description": "deee",
   *       "estimate": "212"
   *     }
   * }
   */

  try {
    const response = await postRequest({ url: ApiUrl.activities, data: activityPayload });
    dispatch(Actions.createActivity(response.data));
  } catch (error) {
    console.error(error);
    // Dispatch failure action
    // dispatch({
    //   type: CREATE_ACTIVITY_FAILURE,
    //   payload: { error: error.message },
    // });
  }
};

export const deleteActivity = async (dispatch, activityId) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await deleteRequest({ url: `${ApiUrl.activities}/${activityId}` });
    dispatch(Actions.deleteActivity(activityId));
  } catch (error) {
    console.error(error);
  }
};

export const updateActivity = async (dispatch, activity) => {
  try {
    const response = await putRequest({
      url: `${ApiUrl.activities}/${activity.id}`,
      data: activity,
    });
    dispatch(Actions.setActivity(response));
  } catch (error) {
    console.error(error);
  }
};
