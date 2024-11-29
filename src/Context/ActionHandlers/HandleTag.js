import { ApiUrl } from '@Constants/ApiUrl';
import { deleteRequest } from '@Api/http-service';

export const handleDeleteTag = async (tagId) => {
  // should return an object. That's it
  try {
    const response = await deleteRequest({ url: `${ApiUrl.plannerConfig}/userTags/${tagId}` });
    console.log('response', response);
    if (response) {
      return response;
    }
  } catch (e) {
    console.error(e);
  }
};
