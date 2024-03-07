import React from 'react';
import { Typography } from '@mui/material';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FolderIcon from '@mui/icons-material/Folder';
import StyleIcon from '@mui/icons-material/Style';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Grid from '@mui/material/Grid';
import '@Assets/styles/page-title.scss';

const icons = {
  Schedule: <CalendarViewWeekIcon />,
  Tags: <StyleIcon />,
  Analytics: <AnalyticsIcon />,
  Projects: <FolderIcon />,
};

export function PageTitle({ currentView }) {
  const routeIcon = icons[currentView] || <EmojiEmotionsIcon />;

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
