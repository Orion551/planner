import { SnackbarContent } from 'notistack';
import React from 'react';
import { Box, Typography } from '@mui/material';
import '@Assets/styles/snackbar.scss';

const InfoSnackbar = React.forwardRef((props, ref) => {
  const { id, message } = props;

  return (
    <SnackbarContent
      id={id}
      ref={ref}
      role='alert'
      className='custom-notistack notistack-MuiContent-info'
    >
      <Box className='notistack-icon'>ℹ️</Box>
      <Typography variant='body2'>{message}</Typography>
    </SnackbarContent>
  );
});

InfoSnackbar.displayName = 'InfoSnackbar';

export default InfoSnackbar;
