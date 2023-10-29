import * as React from 'react';
import { Link } from 'react-router-dom';

import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import FolderIcon from '@mui/icons-material/Folder';
import StyleIcon from '@mui/icons-material/Style';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function NavbarButtons() {
    return (
        <>
            <div className="navbar-buttons-container">
                <Link to="schedule">
                    <button className="navbar-button">
                        <CalendarViewWeekIcon />
                        <span>Schedule</span>
                    </button>
                </Link>

                <Link to="projects">
                    <button className="navbar-button">
                        <FolderIcon />
                        <span>Projects</span>
                    </button>
                </Link>

                <Link to="tags">
                    <button className="navbar-button">
                        <StyleIcon />
                        <span>Tags</span>
                    </button>
                </Link>

                <Link to="analytics">
                    <button className="navbar-button">
                        <AnalyticsIcon />
                        <span>Analytics</span>
                    </button>
                </Link>

            </div>

        </>
    );
}