import * as React from 'react';
import '../../../assets/styles/widget.scss';
import DoneIcon from '@mui/icons-material/Done';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

export default class CompletedActivitiesWidget extends React.Component {
    widgetName = this.props.widgetName;
    completedActivities = this.props.compltedActivities;
    render() {
        return (
            <>
                <div
                    id={`widget-container`}
                    className={`${this.widgetName}`}
                >
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={0.5}
                    >
                        <Grid item xs>
                            <Grid container direction="row" className="widget-header" spacing={0.5}>
                                <DoneIcon />
                                <Typography className="widget-header-title" variant="h6">Completed this week</Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs>
                            <Typography variant="h3">
                                {this.completedActivities}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </>
        )
    }
}