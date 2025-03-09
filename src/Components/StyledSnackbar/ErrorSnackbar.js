import { SnackbarContent } from 'notistack';
import React from 'react';
import { Typography } from '@mui/material';
import '@Assets/styles/snackbar.scss';

const ErrorSnackbar = React.forwardRef((props, ref) => {
  const { id, message, ...other } = props;
  id;

  return (
    <SnackbarContent
      ref={ref}
      role='alert'
      {...other}
      className='custom-notistack notistack-MuiContent-error'
    >
      {/*<Box>*/}
      <span>✖</span>
      <Typography variant='body2'>{message} eee</Typography>
      {/*</Box>*/}
    </SnackbarContent>
  );
});

ErrorSnackbar.displayName = 'ErrorSnackbar';

export default ErrorSnackbar;
