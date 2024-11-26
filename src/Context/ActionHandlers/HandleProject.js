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
    console.log(response.data);
    dispatch(Actions.createProject(response.data));
    //dispatch...
  } catch (error) {
    console.error(error);
  }
};

export const updateProject = async (dispatch, project) => {
  try {
    const response = await putRequest({
      url: `${ApiUrl.projects}/${project.id}`,
      data: project,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
