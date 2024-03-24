import React from 'react';
import TextField from '@mui/material/TextField';

export const DescriptionInput = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      multiline
      rows={4}
      label='Description'
      variant='outlined'
      value={value}
      onChange={onChange}
    />
  );
};
