import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

export const ValidationFeedback = ({ validationMessage }) => {
  return (
    <>
      <Box
        sx={{
          paddingTop: 1,
          paddingBottom: 1,
          paddingLeft: 1,
          paddingRight: 1,
          border: 'none',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#ffb5b5',
          borderRadius: '10px',
          width: 'fit-content',
        }}
      >
        <Box sx={{ display: 'flex', marginRight: '0.5rem' }}>
          <ErrorIcon sx={{ color: 'red', fontSize: '1.3rem' }} />
        </Box>
        <Box>
          <Typography variant='body2' color='error'>
            {validationMessage}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
