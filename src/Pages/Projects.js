import React, { useEffect } from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { getRequest } from '@Api/http-service';
import { ApiUrl } from '@Constants/ApiUrl';
import { initProjects, useGlobalState } from '@Context/GlobalStateContext';

export function Projects() {
  const { state: appState, dispatch } = useGlobalState();
  appState;

  useEffect(() => {
    (async function () {
      try {
        await getRequest({ url: ApiUrl.projects }).then((response) => {
          dispatch(initProjects(response));
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch]);

  return (
    <>
      <Grid id='page' container direction='column' spacing={2}>
        <Grid item xs={11}>
          <Typography variant='h5'>Under construction</Typography>
          <ConstructionIcon />
        </Grid>
      </Grid>
    </>
  );
}
