import React from 'react';
import { PageTitleView } from '@Components/PageTitle.view';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export function Projects() {
  return (
    <>
      <Grid id='page' container direction='column' spacing={2}>
        <Grid item xs={1}>
          <PageTitleView currentView='projects' />
        </Grid>

        <Grid item xs={11}>
          <Typography variant='h5'>Under construction</Typography>
          <ConstructionIcon />
        </Grid>
      </Grid>
    </>
  );
}