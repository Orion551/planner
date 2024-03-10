import React from 'react';
import { Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { CalendarViewWeek, Folder, Analytics } from '@mui/icons-material';

export function NavbarButtons() {
  return (
    <>
      <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')}>
        <Button className='navbar-button' startIcon={<CalendarViewWeek />}>
          <Typography variant='overline'>Schedule</Typography>
        </Button>
      </NavLink>

      <NavLink to='projects' className={({ isActive }) => (isActive ? 'active' : '')}>
        <Button className='navbar-button' startIcon={<Folder />}>
          <Typography variant='overline'>Projects</Typography>
        </Button>
      </NavLink>

      <NavLink to='analytics' className={({ isActive }) => (isActive ? 'active' : '')}>
        <Button className='navbar-button' startIcon={<Analytics />}>
          <Typography variant='overline'>Analytics</Typography>
        </Button>
      </NavLink>
    </>
  );
}
