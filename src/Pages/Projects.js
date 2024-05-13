import React, { useEffect, useState } from 'react';
// import { Typography } from '@mui/material';
import { getRequest } from '@Api/http-service';
import { ApiUrl } from '@Constants/ApiUrl';
import { initProjects, toggleProjectsModal, useGlobalState } from '@Context/GlobalStateContext';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { NoProjectsView } from '@Utils/NoProjectsView';
import { Button } from '@mui/material';
import { ProjectsModalView } from '@Components/ProjectsModal/ProjectsModal.view';
import { useTranslation } from 'react-i18next';
import { SelectProjectView } from '@Utils/SelectProjectView';
import { ProjectInfoView } from '@Components/ProjectInfo/ProjectInfoView';
import { ProjectsListSidebarView } from '@Components/ProjectInfo/ProjectsListSidebarView';

export function Projects() {
  const { state: appState, dispatch } = useGlobalState();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const appBarHeight = 97;
  const remainingHeight = `calc(100vh - ${appBarHeight}px)`;
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        await getRequest({ url: ApiUrl.projects }).then((response) => {
          dispatch(initProjects(response));
          setIsLoading(false);
        });
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  const handleProjectsModal = () => {
    dispatch(toggleProjectsModal(true));
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {appState.projects.length > 0 ? (
            <Box
              height={remainingHeight}
              display='flex'
              flexDirection='row'
              sx={{ width: '100%', flex: '1', overflowX: 'auto', justifyContent: 'stretch' }}
              component='section'
            >
              {/* LEFT BOX */}
              <Box
                display='flex'
                flexDirection='column'
                paddingLeft='8px'
                paddingRight='8px'
                sx={{ width: '300px', alignItems: 'center', paddingTop: '10px' }}
              >
                <Button color='primary' variant='outlined' onClick={handleProjectsModal}>
                  {t('projects.new_project')}
                </Button>
                <ProjectsListSidebarView
                  projects={appState.projects}
                  onProjectSelect={handleProjectSelect}
                />
              </Box>
              {/* RIGHT BOX */}
              <Box
                display='flex'
                flexDirection='column'
                justifyContent={selectedProject === null ? 'center' : 'flex-start'}
                sx={{ width: '100%' }}
              >
                {selectedProject !== null ? (
                  <ProjectInfoView project={selectedProject !== null ? selectedProject : {}} />
                ) : (
                  <SelectProjectView />
                )}
              </Box>
            </Box>
          ) : (
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              sx={{ userSelect: 'none' }}
              height={remainingHeight}
            >
              <NoProjectsView />
              <Button color='primary' variant='outlined' onClick={handleProjectsModal}>
                {t('projects.new_project')}
              </Button>
              <ProjectsModalView />
            </Box>
          )}
        </>
      )}
    </>
  );
}
