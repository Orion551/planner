import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';

export const SelectProject = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        sx={{ textAlign: 'center', marginBottom: '15px', color: 'text.hint' }}
      >
        <Typography variant='h4'>
          {t('projects.select_a_project_on_the_left_to_get_started')}
        </Typography>
      </Box>
    </>
  );
};
