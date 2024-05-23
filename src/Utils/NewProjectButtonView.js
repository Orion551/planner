import React from 'react';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { toggleProjectsModal, useGlobalState } from '@Context/GlobalStateContext';
import { ProjectsModalView } from '@Components/ProjectsModal/ProjectsModal.view';

export const NewProjectButtonView = () => {
  const { t } = useTranslation();
  const { dispatch } = useGlobalState();
  const handleProjectsModal = () => {
    console.log('should do something');
    dispatch(toggleProjectsModal(true));
  };
  return (
    <>
      <Button color='primary' variant='outlined' onClick={handleProjectsModal}>
        {t('projects.new_project')}
      </Button>
      <ProjectsModalView />
    </>
  );
};
