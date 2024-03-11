import React from 'react';
import '@Assets/styles/widget.scss';
import DoneIcon from '@mui/icons-material/Done';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const CompletedActivitiesWidget = ({ widgetName, compltedActivities }) => {
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
              <DoneIcon />
              <Typography className='widget-header-title' variant='h6'>
                {t('widgets.title.completed')}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs>
            <Typography variant='h3'>{compltedActivities}</Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
