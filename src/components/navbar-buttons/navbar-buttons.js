import * as React from 'react';
import '../../assets/styles/navbar.css';

import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import FolderIcon from '@mui/icons-material/Folder';
import StyleIcon from '@mui/icons-material/Style';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function NavbarButtons() {
    return (
        <>
            <div className="navbar-buttons-container">
                <button className="navbar-button">
                    <CalendarViewWeekIcon />
                    <span>Schedule</span>
                </button>
                <button className="navbar-button">
                    <FolderIcon />
                    <span>Projects</span>
                </button>
                <button className="navbar-button">
                    <StyleIcon />
                    <span>Tags</span>
                </button>
                <button className="navbar-button">
                    <AnalyticsIcon />
                    <span>Reports</span>
                </button>
            </div>

        </>
    );
}