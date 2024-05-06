import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

export const NoProjectsView = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        sx={{ textAlign: 'center', marginBottom: '15px', color: 'text.hint', userSelect: 'none' }}
      >
        <Typography variant='h4'>{t('projects.it_looks_like_there_are_no_projects')}</Typography>
        <Typography variant='h4'>{t('projects.create_one')}</Typography>
      </Box>
    </>
  );
};
