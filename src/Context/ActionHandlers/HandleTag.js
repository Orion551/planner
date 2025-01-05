import { ApiUrl } from '@Constants/ApiUrl';
import { deleteRequest, postRequest, putRequest } from '@Api/http-service';

export const handleTagCreate = async (tagData) => {
  try {
    const response = await postRequest({ url: ApiUrl.userTags, data: tagData });
    console.log('## response', response);
    if (response.status === 200) return response.data;
    else return null;
  } catch (err) {
    console.error(err);
  }
};

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

export const handleTagUpdate = async (tag) => {
  try {
    const response = await putRequest({ url: `${ApiUrl.userTags}/${tag.tagId}`, data: tag });
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};
