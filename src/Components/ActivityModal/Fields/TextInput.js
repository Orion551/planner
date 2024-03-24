// TitleInput.js
import React from 'react';
import TextField from '@mui/material/TextField';

export const TextInput = ({ label, value, onChange, isRequired }) => {
  return (
    <TextField
      required={isRequired}
      label={label}
      variant='outlined'
      value={value}
      onChange={onChange}
      size='small'
      margin='normal'
    />
  );
};
