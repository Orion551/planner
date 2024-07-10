import { deleteRequest, postRequest, putRequest } from '@Api/http-service';
import { ApiUrl } from '@Constants/ApiUrl';
import { Actions } from '@Context/Actions';

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
    console.log(response);
    dispatch(Actions.createActivity(response.data.response));
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
    const response = await deleteRequest({ url: `${ApiUrl.activities}/${activityId}` });
    console.log('response', response);
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
    console.log(response);
    dispatch;
  } catch (error) {
    console.error(error);
  }
};
