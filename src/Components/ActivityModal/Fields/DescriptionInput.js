import React from 'react';
import TextField from '@mui/material/TextField';

export const DescriptionInput = ({
  placeholder = '',
  isRequired = false,
  label,
  value,
  onChange,
}) => {
  const handleDescriptionFieldChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      fullWidth
      multiline
      rows={4}
      required={isRequired}
      label={label}
      variant='outlined'
      placeholder={placeholder}
      value={value}
      onChange={handleDescriptionFieldChange}
    />
  );
};
