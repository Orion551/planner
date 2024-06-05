import { v4 as uuid } from 'uuid';
import { postRequest } from '@Api/http-service';
import { ApiUrl } from '@Constants/ApiUrl';

export const handleActivityCreate = async (state, activity) => {
  // Create an id
  const activityId = uuid().slice(0, 8);
  console.log('payload', activity);
  const newActivity = {
    id: activityId,
    ...activity,
  };

  const updatedColumns = state.configData.scheduleColumns.map((column) => {
    if (activity.selectedColumns.includes(column.columnId)) {
      return {
        ...column,
        columnTaskIds: [...column.columnTaskIds, activityId],
      };
    }
    return column;
  });

  const updatedActivities = [...state.activities, newActivity];
  // eslint-disable-next-line no-unused-vars
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

  try {
    // Make API call
    await postRequest({ url: ApiUrl.activities, data: newActivity });
    console.log('success');
    await postRequest({});

    // Dispatch success action
    // dispatch({
    //   type: CREATE_ACTIVITY_SUCCESS,
    //   payload: { newActivity },
    // });
  } catch (error) {
    // Dispatch failure action
    // dispatch({
    //   type: CREATE_ACTIVITY_FAILURE,
    //   payload: { error: error.message },
    // });
  }
};
