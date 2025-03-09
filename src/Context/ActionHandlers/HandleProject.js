import { ApiUrl } from '@Constants/ApiUrl';
import { Actions } from '@Context/Actions';
import { postRequest, putRequest } from '@Api/http-service';
import { enqueueSnackbar } from 'notistack';

/**
 * Payload..
 * {
 *     "projectName": "Console log",
 *     "tags": null,
 *     "attachments": null,
 *     "projectDescription": "A simple project;"
 * }
 */

export const createProject = async (dispatch, projectPayload, locale) => {
  try {
    const response = await postRequest({ url: ApiUrl.projects, data: projectPayload });
    enqueueSnackbar(locale('notifications.project.success.project_created_successfully'), {
      variant: 'successSnackbar',
      persist: false,
    });
    dispatch(Actions.createProject(response.data));
  } catch (error) {
    console.error(error);
    enqueueSnackbar(locale('notifications.project.error.error_during_project_creation_retry'), {
      variant: 'successSnackbar',
      persist: false,
    });
  }
};

export const updateProject = async (dispatch, project) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await putRequest({
      url: `${ApiUrl.projects}/${project.id}`,
      data: project,
    });
  } catch (error) {
    console.error(error);
  }
};
