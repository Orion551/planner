import * as React from 'react';
import { Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";

import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import FolderIcon from '@mui/icons-material/Folder';
import StyleIcon from '@mui/icons-material/Style';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function NavbarButtons() {
    return (
        <>
            <Link to="/">
                <Button className="navbar-button" startIcon={<CalendarViewWeekIcon />}>
                    <Typography variant="overline">Schedule</Typography>
                </Button>
            </Link>

            <Link to="projects">
                <Button className="navbar-button" startIcon={<FolderIcon />}>
                    <Typography variant="overline">Projects</Typography>
                </Button>
            </Link>

            <Link to="analytics">
                <Button className="navbar-button" startIcon={<AnalyticsIcon />}>
                    <Typography variant="overline">Analytics</Typography>
                </Button>
            </Link>
        </>
    );
}