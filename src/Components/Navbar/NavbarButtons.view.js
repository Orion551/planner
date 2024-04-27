import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
// import { CalendarViewWeek, Folder, Analytics } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export function NavbarButtonsView() {
  const { t } = useTranslation();
  return (
    <>
      <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')}>
        <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemText primary={t('sections.schedule')} />
        </ListItemButton>
      </NavLink>

      <NavLink to='projects' className={({ isActive }) => (isActive ? 'active' : '')}>
        <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemText primary={t('sections.projects')} />
        </ListItemButton>
      </NavLink>

      <NavLink to='analytics' className={({ isActive }) => (isActive ? 'active' : '')}>
        <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemText primary={t('sections.reports')} />
        </ListItemButton>
      </NavLink>
    </>
  );
}
