import { ApiUrl } from '@Constants/ApiUrl';
import { deleteRequest, postRequest, putRequest } from '@Api/http-service';
import { enqueueSnackbar } from 'notistack';

export const handleTagCreate = async (tagData, locale) => {
  try {
    const response = await postRequest({ url: ApiUrl.userTags, data: tagData });
    console.log('## response', response);
    enqueueSnackbar(locale('notifications.tag.success.tag_created_successfully'), {
      variant: 'successSnackbar',
      persist: false,
    });
    if (response.status === 200) return response.data;
    else return null;
  } catch (err) {
    console.error(err);
    enqueueSnackbar(locale('notifications.tag.error.error_during_tag_creation'), {
      variant: 'errorSnackbar',
      persist: false,
    });
  }
};

export const handleDeleteTag = async (tagId, locale) => {
  // should return an object. That's it
  try {
    const response = await deleteRequest({ url: `${ApiUrl.plannerConfig}/userTags/${tagId}` });
    if (response) {
      enqueueSnackbar(locale('notifications.tag.success.tag_deleted_successfully'), {
        variant: 'successSnackbar',
        persist: false,
      });
      return response;
    }
  } catch (e) {
    console.error(e);
    enqueueSnackbar(locale('notifications.tag.error.error_deleting_tag_retry'), {
      variant: 'errorSnackbar',
      persist: false,
    });
  }
};

export const handleTagUpdate = async (tag, locale) => {
  try {
    const response = await putRequest({ url: `${ApiUrl.userTags}/${tag.tagId}`, data: tag });
    enqueueSnackbar(locale('notifications.tag.success.tag_updated_successfully'), {
      variant: 'successSnackbar',
      persist: false,
    });
    return response;
  } catch (err) {
    console.error(err);
    enqueueSnackbar(locale('notifications.tag.error.error_updating_tag_retry'), {
      variant: 'errorSnackbar',
      persist: false,
    });
  }
};
