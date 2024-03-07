import * as React from 'react';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import FolderIcon from '@mui/icons-material/Folder';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function NavbarButtons() {
  return (
    <>
      <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')}>
        <Button className='navbar-button' startIcon={<CalendarViewWeekIcon />}>
          <Typography variant='overline'>Schedule</Typography>
        </Button>
      </NavLink>

      <NavLink to='projects' className={({ isActive }) => (isActive ? 'active' : '')}>
        <Button className='navbar-button' startIcon={<FolderIcon />}>
          <Typography variant='overline'>Projects</Typography>
        </Button>
      </NavLink>

      <NavLink to='analytics' className={({ isActive }) => (isActive ? 'active' : '')}>
        <Button className='navbar-button' startIcon={<AnalyticsIcon />}>
          <Typography variant='overline'>Analytics</Typography>
        </Button>
      </NavLink>
    </>
  );
}
