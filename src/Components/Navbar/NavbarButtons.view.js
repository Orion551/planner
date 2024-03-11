import React from 'react';
import { Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { CalendarViewWeek, Folder, Analytics } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export function NavbarButtonsView() {
  const { t } = useTranslation();
  return (
    <>
      <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')}>
        <Button className='navbar-button' startIcon={<CalendarViewWeek />}>
          <Typography variant='overline'>{t('sections.schedule')}</Typography>
        </Button>
      </NavLink>

      <NavLink to='projects' className={({ isActive }) => (isActive ? 'active' : '')}>
        <Button className='navbar-button' startIcon={<Folder />}>
          <Typography variant='overline'>{t('sections.projects')}</Typography>
        </Button>
      </NavLink>

      <NavLink to='analytics' className={({ isActive }) => (isActive ? 'active' : '')}>
        <Button className='navbar-button' startIcon={<Analytics />}>
          <Typography variant='overline'>{t('sections.reports')}</Typography>
        </Button>
      </NavLink>
    </>
  );
}
