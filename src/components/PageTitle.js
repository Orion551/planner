import React from 'react';
import { Folder, Analytics, EmojiEmotions, CalendarViewWeek } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

import '@Assets/styles/page-title.scss';

const icons = {
  Schedule: <CalendarViewWeek />,
  Analytics: <Analytics />,
  Projects: <Folder />,
};

export function PageTitle({ currentView }) {
  const routeIcon = icons[currentView] || <EmojiEmotions />;

  return (
    <>
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='flex-start'
        id='page-title-container'
      >
        <Grid item id='page-title-icon'>
          {routeIcon}
        </Grid>
        <Grid item xs={11}>
          <Typography variant='h5' id='page-title'>
            {currentView}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
