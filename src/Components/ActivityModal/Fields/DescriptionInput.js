import React from 'react';
import TextField from '@mui/material/TextField';

export const DescriptionInput = ({ placeholder = '', label, value, onChange }) => {
  return (
    <TextField
      fullWidth
      multiline
      rows={4}
      label={label}
      variant='outlined'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
