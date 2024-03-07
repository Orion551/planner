import * as React from 'react';
import '../../../assets/styles/widget.scss';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import InsertChartIcon from '@mui/icons-material/InsertChart';

export default class PlannedActivitiesWidget extends React.Component {
  widgetName = this.props.widgetName;
  plannedActivities = this.props.plannedActivities;

  render() {
    return (
      <>
        <div id={'widget-container'} className={`${this.widgetName}`}>
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
                  Planned Activities
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs>
              <Typography variant='h3'>{this.plannedActivities}</Typography>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}
