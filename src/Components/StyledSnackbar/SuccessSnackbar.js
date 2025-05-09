import { SnackbarContent } from 'notistack';
import React from 'react';
import { Box, Typography } from '@mui/material';
import '@Assets/styles/snackbar.scss';

const SuccessSnackbar = React.forwardRef((props, ref) => {
  const { id, message } = props;

  return (
    <SnackbarContent
      id={id}
      ref={ref}
      role='alert'
      className='custom-notistack notistack-MuiContent-success'
    >
      <Box className='notistack-icon'>👍</Box>
      <Typography variant='body2'>{message}</Typography>
    </SnackbarContent>
  );
});

SuccessSnackbar.displayName = 'SuccessSnackbar';

export default SuccessSnackbar;
