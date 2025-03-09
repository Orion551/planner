import { SnackbarContent } from 'notistack';
import React from 'react';
import { Box, Typography } from '@mui/material';
import '@Assets/styles/snackbar.scss';

const ErrorSnackbar = React.forwardRef((props, ref) => {
  const { id, message } = props;

  return (
    <SnackbarContent
      id={id}
      ref={ref}
      role='alert'
      className='custom-notistack notistack-MuiContent-error'
    >
      <Box className='notistack-icon'>✖</Box>
      <Typography variant='body2'>{message}</Typography>
    </SnackbarContent>
  );
});

ErrorSnackbar.displayName = 'ErrorSnackbar';

export default ErrorSnackbar;
