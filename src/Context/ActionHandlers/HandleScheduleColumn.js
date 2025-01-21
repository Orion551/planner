import { ApiUrl } from '@Constants/ApiUrl';
import { putRequest } from '@Api/http-service';

export const handleActivityMove = async (source, destination, activity) => {
  try {
    const reqObject = {
      source: source,
      destination: destination,
      activities: [activity],
    };
    const response = await putRequest({
      url: `${ApiUrl.plannerConfig}${ApiUrl.scheduleColumns}?action=move`,
      data: reqObject,
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};
