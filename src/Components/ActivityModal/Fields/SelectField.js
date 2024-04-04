import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

export const SelectField = ({ options, value, onChange }) => {
  return (
    <FormControl size='small' disabled>
      <InputLabel>Select</InputLabel>
      <Select value={value} onChange={onChange}>
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
