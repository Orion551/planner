import React from 'react';
import { PageTitle } from '@Components/PageTitle';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export function Tags() {
  return (
    <>
      <Grid id='page' container direction='column' spacing={1}>
        <Grid item xs={1}>
          <PageTitle currentView='Tags' />
        </Grid>

        <Grid item xs={11}>
          <Typography variant='h5'>Under construction</Typography>
          <ConstructionIcon />
        </Grid>
      </Grid>
    </>
  );
}
