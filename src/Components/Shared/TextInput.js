// TitleInput.js
import React from 'react';
import TextField from '@mui/material/TextField';
import { handleKeyDown } from '@Utils/HandleKeyDown';

export const TextInput = ({
  placeholder = '',
  label,
  value,
  onChange,
  isRequired,
  onEnter = () => {},
}) => {
  const handleTextFieldChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      required={isRequired}
      placeholder={placeholder}
      label={label}
      variant='outlined'
      value={value}
      size='small'
      margin='normal'
      onChange={handleTextFieldChange}
      onKeyDown={(e) => handleKeyDown(e, onEnter)}
    />
  );
};
