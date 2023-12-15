import * as React from 'react';
import { Typography } from "@mui/material";
import { Link } from 'react-router-dom';

import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import FolderIcon from '@mui/icons-material/Folder';
import StyleIcon from '@mui/icons-material/Style';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function NavbarButtons() {
    return (
        <>
            <Link to="/" className="navbar-button">
                <CalendarViewWeekIcon />
                <Typography variant="overline">Schedule</Typography>
            </Link>

            <Link to="projects" className="navbar-button">
                <FolderIcon />
                <Typography variant="overline">Projects</Typography>
            </Link>

            <Link to="tags" className="navbar-button">
                <StyleIcon />
                <Typography variant="overline">Tags</Typography>
            </Link>

            <Link to="analytics" className="navbar-button">
                <AnalyticsIcon />
                <Typography variant="overline">Analytics</Typography>
            </Link>
        </>
    );
}