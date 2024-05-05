import React from 'react';
// import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';

export const SelectProject = () => {
  //   const { t } = useTranslation();
  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        sx={{ textAlign: 'center', marginBottom: '15px', color: 'text.hint' }}
      >
        <Typography variant='h4'>Select a Project on the left to get started!</Typography>
      </Box>
    </>
  );
};
