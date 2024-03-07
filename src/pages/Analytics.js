import React from 'react';
import { PageTitle } from '../components/PageTitle';
import { Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import Grid from '@mui/material/Grid';

export function Analytics() {
  return (
    <>
      <Grid id='page' container direction='column' spacing={1}>
        <Grid item xs={1}>
          <PageTitle currentView='Analytics' />
        </Grid>

        <Grid item xs={11}>
          <Typography variant='h5'>Under construction</Typography>
          <ConstructionIcon />
        </Grid>
      </Grid>
    </>
  );
}
