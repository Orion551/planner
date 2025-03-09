import { SnackbarContent } from 'notistack';
import React, { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';
import '@Assets/styles/snackbar.scss';

const SuccessSnackbar = forwardRef((props, ref) => {
  const { id, message, ...other } = props;
  id;

  return (
    <SnackbarContent
      ref={ref}
      role='alert'
      {...other}
      className='custom-notistack notistack-MuiContent-success'
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <Box className='notistack-icon'>✔️</Box>
        <span></span>
        <Typography variant='body2'>{message} kkk</Typography>
      </Box>
    </SnackbarContent>
  );
});

SuccessSnackbar.displayName = 'SuccessSnackbar';

export default SuccessSnackbar;
