import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Formik } from 'formik';
import { getProjectFormSchema } from '@Validations/projectFormSchema';
import { NewProject } from '@Components/ProjectsModal/NewProject';
import {
  handleProjectCreate,
  handleProjectModalClose,
} from '@Context/ActionHandlers/HandleProjectModal';

export const ProjectsModalView = () => {
  const { state: appState, dispatch } = useGlobalState();
  const { t } = useTranslation();

  const projectInitialValues = {
    projectName: '',
    projectDescription: '',
    projectTags: [],
    projectAttachments: [],
  };

  return (
    <Formik
      initialValues={projectInitialValues}
      onSubmit={() => {}}
      validationSchema={getProjectFormSchema(t)}
      validateOnMount={true}
    >
      {(formik) => (
        <React.Fragment>
          <Dialog
            open={appState.projectsModal.isProjectsModalOpen}
            scroll='paper'
            fullWidth={true}
            disableEscapeKeyDown={true}
          >
            <DialogTitle>{t('projects_modal.new_project')}</DialogTitle>
            <IconButton
              onClick={() => handleProjectModalClose(dispatch)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent>
              <NewProject formik={formik} />
            </DialogContent>
            <DialogActions>
              <Button
                color='primary'
                variant='contained'
                disabled={!formik.isValid || formik.isSubmitting}
                onClick={() => handleProjectCreate(dispatch, formik.values)}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </Formik>
  );
};
