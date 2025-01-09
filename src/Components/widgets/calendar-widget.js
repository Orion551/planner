import React from 'react';
import '@Assets/styles/widget.scss';
import { Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

const getCurrentWeekRange = () => {
  const today = new Date();
  // Monday as the first day of the week
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday as the first day of the week

  // Sunday as last day of the week
  const lastDayOfWeek = new Date(today);
  lastDayOfWeek.setDate(today.getDate() - today.getDay() + 7); // Sunday as the last day of the week
  // TODO: A user could want to change this dynamically

  return {
    start: firstDayOfWeek.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    end: lastDayOfWeek.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
  };
};

const getCurrentMonthAndYear = () => {
  const today = new Date();
  return today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export const CalendarWidget = ({ widgetName }) => {
  const { t } = useTranslation();

  const monthAndYear = getCurrentMonthAndYear();
  const weekRange = getCurrentWeekRange();

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
                {t('widgets.calendar.title')}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs>
            <Typography variant='body1'>{monthAndYear}</Typography>
          </Grid>

          <Grid item xs>
            <Typography variant='body1'>
              {t('widgets.calendar.week')} {weekRange.start} - {weekRange.end}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
