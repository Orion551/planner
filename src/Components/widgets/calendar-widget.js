import React from 'react';
import '@Assets/styles/widget.scss';
import { Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

export const CalendarWidget = ({ widgetName }) => {
  const { t } = useTranslation();
  return (
    <>
      <div id={'widget-container'} className={`${widgetName}`}>
        <Grid
          container
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          spacing={0.5}
        >
          <Grid item xs>
            <Grid container direction='row' className='widget-header' spacing={0.5}>
              <CalendarMonthIcon />
              <Typography className='widget-header-title' variant='h6'>
                {t('widgets.title.calendar')}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs>
            <Typography variant='body1'>December, 2023</Typography>
          </Grid>

          <Grid item xs>
            <Typography variant='body1'>Week 3, 18 - 24</Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
