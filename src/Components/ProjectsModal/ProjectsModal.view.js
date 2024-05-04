import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import IconButton from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useGlobalState } from '@Context/GlobalStateContext';

export const ProjectsModalView = () => {
  const { state: appState } = useGlobalState();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Dialog
        open={appState.projectsModal.isProjectsModalOpen}
        scroll='paper'
        PaperProps={{ component: 'form' }}
        fullWidth={true}
      >
        <DialogTitle>{t('projects_modal.new_project')}</DialogTitle>
        <IconButton
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers></DialogContent>
        <DialogActions>
          <Button>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
