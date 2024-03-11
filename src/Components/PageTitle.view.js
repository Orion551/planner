import React from 'react';
import { Folder, Analytics, EmojiEmotions, CalendarViewWeek } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '@Assets/styles/page-title.scss';

const icons = {
  schedule: <CalendarViewWeek />,
  reports: <Analytics />,
  projects: <Folder />,
};

export function PageTitleView({ currentView }) {
  const routeIcon = icons[currentView] || <EmojiEmotions />;
  const { t } = useTranslation();

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
            {t(`sections.${currentView}`)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
