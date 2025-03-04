import { createProject } from '@Context/ActionHandlers/HandleProject';
import { Actions } from '@Context/Actions';

export const handleProjectModalClose = (dispatch) => dispatch(Actions.toggleProjectsModal(false));

export const handleProjectCreate = async (dispatch, project) => {
  console.log('project', project);
  await createProject(dispatch, project);
};
