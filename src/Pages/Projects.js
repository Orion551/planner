import React, { useEffect, useState } from 'react';
import { getRequest } from '@Api/http-service';
import { ApiUrl } from '@Constants/ApiUrl';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { NoProjectsView } from '@Utils/NoProjectsView';
import { Actions } from '@Context/Actions';
// import { ProjectsModalView } from '@Components/ProjectsModal/ProjectsModal.view';
import { SelectProjectView } from '@Utils/SelectProjectView';
import { ProjectInfoView } from '@Components/ProjectInfo/ProjectInfoView';
import { ProjectsListSidebarView } from '@Components/ProjectInfo/ProjectsListSidebarView';
import { NewProjectButtonView } from '@Utils/NewProjectButtonView';

export function Projects() {
  const { state: appState, dispatch } = useGlobalState();
  // const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const appBarHeight = 97;
  const remainingHeight = `calc(100vh - ${appBarHeight}px)`;

  const [activeProjects, setActiveProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [archivedProjects, setArchivedProjects] = useState([]);

  /**
   * Handles the list of project on the right of the page;
   */
  useEffect(() => {
    const active = appState.projects.filter(
      (project) => project.projectStatus === 1 || project.projectStatus === 2
    );
    setActiveProjects(active);

    const completed = appState.projects.filter((project) => project.projectStatus === 3);
    setCompletedProjects(completed);

    const archived = appState.projects.filter((project) => project.projectStatus === 4);
    setArchivedProjects(archived);
  }, [appState.projects]);

  /**
   * Fetches projects
   */
  useEffect(() => {
    (async function () {
      try {
        await getRequest({ url: ApiUrl.projects }).then((response) => {
          dispatch(Actions.initProjects(response));
          setIsLoading(false);
        });
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  const handleProjectSelect = (project) => {
    dispatch(
      Actions.setSelectedProject(appState.selectedProject?.id === project.id ? null : project)
    );
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
                <NewProjectButtonView />
                <ProjectsListSidebarView
                  activeProjects={activeProjects}
                  completedProjects={completedProjects}
                  archivedProjects={archivedProjects}
                  onProjectSelect={handleProjectSelect}
                />
              </Box>
              {/* RIGHT BOX */}
              <Box
                display='flex'
                flexDirection='column'
                justifyContent={appState.selectedProject === null ? 'center' : 'flex-start'}
                sx={{ width: '100%' }}
              >
                {appState.selectedProject !== null ? (
                  <ProjectInfoView project={appState.selectedProject} />
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
              <NewProjectButtonView />
            </Box>
          )}
        </>
      )}
    </>
  );
}
