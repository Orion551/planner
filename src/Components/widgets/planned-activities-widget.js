import React from 'react';
import '@Assets/styles/widget.scss';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { useTranslation } from 'react-i18next';

export const PlannedActivitiesWidget = ({ widgetName, plannedActivities }) => {
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
              <InsertChartIcon />
              <Typography className='widget-header-title' variant='h6'>
                {t('widgets.planned_activities.title')}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs>
            <Typography variant='h3'>{plannedActivities}</Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
