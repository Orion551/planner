// TitleInput.js
import React from 'react';
import TextField from '@mui/material/TextField';

export const TextInput = ({ value, onChange }) => {
  return <TextField fullWidth label='Title' variant='outlined' value={value} onChange={onChange} />;
};
