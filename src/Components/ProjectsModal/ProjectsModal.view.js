import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { toggleProjectsModal, useGlobalState } from '@Context/GlobalStateContext';
import { TextInput } from '@Components/Shared/TextInput';
import { DescriptionInput } from '@Components/Shared/DescriptionInput';
import { TagsListView } from '@Components/Tags/TagsList.view';

export const ProjectsModalView = () => {
  const { state: appState, dispatch } = useGlobalState();
  const { t } = useTranslation();

  const handleClose = () => dispatch(toggleProjectsModal(false));

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
          <TextInput
            placeholder={'Project name'}
            isRequired={true}
            label={'Project Name'}
          ></TextInput>
          {/* TODO: Improve <TagsListView>*/}
          <TagsListView
            tags={appState.configData.userTags}
            tagsPalette={appState.configData.tagsPalette}
            tagSelection={() => console.log('')}
          />
          <DescriptionInput
            label={'Description'}
            placeholder={'What is this Project about?'}
            isRequired={false}
          />
          {/*  TODO: Create <Attachments> Component */}
        </DialogContent>
        <DialogActions>
          <Button>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
