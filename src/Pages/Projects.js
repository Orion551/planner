import React, { useEffect, useState } from 'react';
// import { Typography } from '@mui/material';
import { getRequest } from '@Api/http-service';
import { ApiUrl } from '@Constants/ApiUrl';
import { initProjects, toggleProjectsModal, useGlobalState } from '@Context/GlobalStateContext';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { NoProjects } from '@Utils/NoProjects';
import { Button } from '@mui/material';
import { ProjectsModalView } from '@Components/ProjectsModal/ProjectsModal.view';

export function Projects() {
  const { state: appState, dispatch } = useGlobalState();
  appState;
  const [isLoading, setIsLoading] = useState(true);
  const appBarHeight = 97;
  const remainingHeight = `calc(100vh - ${appBarHeight}px)`;

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

  const handleClick = () => {
    dispatch(toggleProjectsModal(true));
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
              border='1px solid grey'
              display='flex'
              flexDirection='row'
              sx={{ width: '100%', flex: '1', overflowX: 'auto' }}
              component='section'
            >
              <Box>content</Box>
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
              <NoProjects />
              <Button color='primary' variant='outlined' onClick={handleClick}>
                + Project
              </Button>
              <ProjectsModalView />
            </Box>
          )}
        </>
      )}
    </>
  );
}
