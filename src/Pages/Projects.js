import React, { useMemo, useState } from 'react';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Box, List } from '@mui/material';
import { NoProjectsView } from '@Utils/NoProjectsView';
import { SelectProjectView } from '@Utils/SelectProjectView';
import { ProjectInfoView } from '@Components/ProjectInfo/ProjectInfoView';
// import { ProjectsListSidebarView } from '@Components/ProjectInfo/ProjectsListSidebarView';
import { NewProjectButtonView } from '@Utils/NewProjectButtonView';
// import { ProjectItemView } from '@Components/ProjectItem/ProjectItemView';
import { ProjectsListSidebarView } from '@Components/ProjectInfo/ProjectsListSidebarView';

export function Projects() {
  const { state: appState } = useGlobalState();
  // const { t } = useTranslation();

  const appBarHeight = 97;
  const remainingHeight = `calc(100vh - ${appBarHeight}px)`;
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const memoizedProjects = useMemo(() => {
    return appState.projects;
  }, [appState.projects]);

  const handleProjectSelect = (project) => {
    setSelectedProjectId(project);
  };

  return (
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
            <List dense={false}>
              <ProjectsListSidebarView
                selectedProject={selectedProjectId?.id}
                onProjectSelected={handleProjectSelect}
                projects={memoizedProjects}
              />
            </List>
          </Box>
          {/* RIGHT BOX */}
          <Box
            display='flex'
            flexDirection='column'
            justifyContent={selectedProjectId === null ? 'center' : 'flex-start'}
            sx={{ width: '100%' }}
          >
            {selectedProjectId !== null ? (
              <ProjectInfoView
                project={appState.projects.find((proj) => proj.id === selectedProjectId?.id)}
              />
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
  );
}
