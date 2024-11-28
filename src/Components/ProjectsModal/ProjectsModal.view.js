import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { Actions } from '@Context/Actions';
import { useGlobalState } from '@Context/GlobalStateContext';
// import { TextInput } from '@Components/Shared/TextInput';
// import { DescriptionInput } from '@Components/Shared/DescriptionInput';
import { TagsListView } from '@Components/Tags/TagsList.view';
import TextField from '@mui/material/TextField';
import { createProject } from '@Context/ActionHandlers/HandleProject';

export const ProjectsModalView = () => {
  const { state: appState, dispatch } = useGlobalState();
  const { t } = useTranslation();
  const [projectForm, setProjectForm] = useState({
    projectName: '',
    projectDescription: '',
    projectTags: [],
    projectAttachments: [],
  });

  const handleChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleClose = () => dispatch(Actions.toggleProjectsModal(false));

  const handleProjectCreate = async () => {
    await createProject(dispatch, projectForm);
    // dispatch(Actions.createProject(projectForm));
    // handleClose();
  };

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
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {/* TODO: You're using components from another Component. So they could be improved and referred as `shared` */}
          <TextField
            name={'projectName'}
            required={true}
            placeholder={'Project name'}
            onChange={handleChange}
            label={'project name'}
            size='small'
            margin='normal'
          />

          {/* TODO: Improve <TagsListView>*/}
          <TagsListView
            tags={appState.configData.userTags}
            tagsPalette={appState.configData.tagsPalette}
            tagSelection={() => console.log('')}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            required={false}
            label={'Description'}
            name={'projectDescription'}
            onChange={handleChange}
          />

          {/*  TODO: Create <Attachments> Component */}
        </DialogContent>
        <DialogActions>
          <Button color='primary' variant='outlined' size='small' onClick={handleProjectCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
