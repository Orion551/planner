import * as React from 'react';
import '../assets/styles/page-title.css';

import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
// import FolderIcon from '@mui/icons-material/Folder';
// import StyleIcon from '@mui/icons-material/Style';
// import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function PageTitle() {
    return (
        <>
            {/*
              * This should get its value from navbar buttons
              * which represent app's current state.
              * For now, will be Schedule (since it's current feature I'm working on)
            */}
            <div className="title-container">
                <CalendarViewWeekIcon />
                {/* TODO: This will be dynamic */}
                <span>Schedule</span>
            </div>
        </>
    )
}