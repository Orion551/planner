import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import { LogoutButton } from '@Components/LogoutButton/LogoutButton';

export const DesktopNavigationBar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const getVariant = (route) => {
    return location.pathname === route ? 'contained' : 'outlined';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <ButtonGroup variant='outlined' aria-label='Basic button group' disableElevation>
        <Button variant={getVariant('/')} component={Link} to='/'>
          {t('sections.schedule')}
        </Button>
        <Button variant={getVariant('/projects')} component={Link} to='/projects'>
          {t('sections.projects')}
        </Button>
        {/*<Button variant={getVariant('/analytics')} component={Link} to='/analytics'>*/}
        {/*  {t('sections.reports')}*/}
        {/*</Button>*/}
      </ButtonGroup>
      <LogoutButton />
    </Box>
  );
};
