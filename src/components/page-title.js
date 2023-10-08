import * as React from 'react';
import '../assets/styles/page-title.css';
import styled from 'styled-components';
import { Typography } from '@mui/material';


import IconButton from '@mui/material/IconButton'
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
// import FolderIcon from '@mui/icons-material/Folder';
// import StyleIcon from '@mui/icons-material/Style';
// import AnalyticsIcon from '@mui/icons-material/Analytics';


export const CustomIcon = styled(CalendarViewWeekIcon)`
  width: 45px !important;
  height: 45px !important;
  color: #1E1E1E !important;
`;

export default function PageTitle() {
    return (
        <>
            {/*
              * This should get its value from navbar buttons
              * which represent app's current state.
              * For now, will be Schedule (since it's current feature I'm working on)
            */}
            <div className="title-container">
                <IconButton>
                    <CustomIcon />
                </IconButton>
                {/*<CalendarViewWeekIcon>*/}
                {/*    */}
                {/*</ CalendarViewWeekIcon>*/}

                {/* TODO: This will be dynamic */}
                <Typography variant="h5" className="text-test">
                    Schedule
                </Typography>
            </div>
        </>
    )
}