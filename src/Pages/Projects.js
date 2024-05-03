import React, { useEffect, useState } from 'react';
// import { Typography } from '@mui/material';
import { getRequest } from '@Api/http-service';
import { ApiUrl } from '@Constants/ApiUrl';
import { initProjects, useGlobalState } from '@Context/GlobalStateContext';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

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

  return (
    <Box
      height={remainingHeight}
      border='1px solid grey'
      display='flex'
      flexDirection='row'
      sx={{ width: '100%', flex: '1', overflowX: 'auto' }}
    >
      {isLoading ? <CircularProgress /> : <Box></Box>}
    </Box>
  );
}
