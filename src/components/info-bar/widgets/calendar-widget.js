import * as React from 'react';
import '../../../assets/styles/widget.scss';
import { Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Grid from '@mui/material/Grid';
export default class CalendarWidget extends React.Component {
    widgetName = this.props.widgetName;
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
                            <Grid container direction="row" spacing={0.5}>
                                <CalendarMonthIcon />
                                <Typography variant="h6">Calendar</Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs>
                            <Typography variant="subtitle2">
                                December, 2023
                            </Typography>
                        </Grid>

                        <Grid item xs>
                            <Typography variant="subtitle2">
                                Week 3, 18 - 24
                            </Typography>
                        </Grid>
                    </Grid>
                </div>

            </>
        )
    }

}