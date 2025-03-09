import { deleteRequest, postRequest, putRequest } from '@Api/http-service';
import { ApiUrl } from '@Constants/ApiUrl';
import { Actions } from '@Context/Actions';
import { enqueueSnackbar } from 'notistack';

export const createActivity = async (dispatch, activityPayload, locale) => {
  enqueueSnackbar(locale('notifications.activity.info.creating_activity'), {
    variant: 'infoSnackbar',
    persist: false,
  });
  try {
    const response = await postRequest({ url: ApiUrl.activities, data: activityPayload });
    dispatch(Actions.createActivity(response.data));
    enqueueSnackbar(locale('notifications.activity.success.activity_created_successfully'), {
      variant: 'successSnackbar',
      persist: false,
    });
  } catch (error) {
    enqueueSnackbar(locale('notifications.activity.error.error_during_activity_creation_retry'), {
      variant: 'errorSnackbar',
      persist: false,
    });
    console.error(error);
  }
};

export const deleteActivity = async (dispatch, activityId, locale) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await deleteRequest({ url: `${ApiUrl.activities}/${activityId}` });
    dispatch(Actions.deleteActivity(activityId));
    enqueueSnackbar(locale('notifications.activity.success.activity_deleted_successfully'), {
      variant: 'successSnackbar',
      persist: false,
    });
  } catch (error) {
    console.error(error);
    enqueueSnackbar(locale('notifications.activity.success.error_during_activity_creation_retry'), {
      variant: 'errorSnackbar',
      persist: false,
    });
  }
};

export const updateActivity = async (dispatch, activity, locale) => {
  try {
    const response = await putRequest({
      url: `${ApiUrl.activities}/${activity.id}`,
      data: activity,
    });
    dispatch(Actions.setActivity(response));
    enqueueSnackbar(locale('notifications.activity.success.activity_updated_successfully'), {
      variant: 'successSnackbar',
      persist: false,
    });
  } catch (error) {
    console.error(error);
    enqueueSnackbar(locale('notifications.activity.error.error_updating_activity_retry'), {
      variant: 'errorSnackbar',
      persist: false,
    });
  }
};
