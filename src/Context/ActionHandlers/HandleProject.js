import { ApiUrl } from '@Constants/ApiUrl';
import { Actions } from '@Context/Actions';
import { postRequest, putRequest } from '@Api/http-service';

/**
 * Payload..
 * {
 *     "projectName": "Console log",
 *     "tags": null,
 *     "attachments": null,
 *     "projectDescription": "A simple project;"
 * }
 */

export const createProject = async (dispatch, projectPayload) => {
  try {
    const response = await postRequest({ url: ApiUrl.projects, data: projectPayload });
    dispatch(Actions.createProject(response.data));
    //dispatch...
  } catch (error) {
    console.error(error);
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
