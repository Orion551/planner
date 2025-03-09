import React from 'react';
import { SnackbarContent } from 'notistack';
import { Box, Typography } from '@mui/material';
import '@Assets/styles/snackbar.scss';

const WarningSnackbar = React.forwardRef((props, ref) => {
  const { id, message } = props;

  return (
    <SnackbarContent
      id={id}
      ref={ref}
      role='alert'
      className='custom-notistack notistack-MuiContent-warning'
    >
      <Box className='notistack-icon'>⚠️</Box>
      <Typography variant='body2'>{message}</Typography>
    </SnackbarContent>
  );
});

WarningSnackbar.displayName = 'WarningSnackbar';

export default WarningSnackbar;
