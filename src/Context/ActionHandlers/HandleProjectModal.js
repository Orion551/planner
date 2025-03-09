import { createProject } from '@Context/ActionHandlers/HandleProject';
import { Actions } from '@Context/Actions';

export const handleProjectModalClose = (dispatch) => dispatch(Actions.toggleProjectsModal(false));

/**
 *
 * @param dispatch {React.useContext} - Global state dispatch action
 * @param project {Object} - Project payload
 * @param locale {React.hook} - useTranslation
 */
export const handleProjectCreate = async (dispatch, project, locale) => {
  console.log('project', project);
  await createProject(dispatch, project, locale);
};
