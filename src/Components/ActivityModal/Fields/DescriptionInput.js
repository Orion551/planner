import React from 'react';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

export const DescriptionInput = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <TextField
      fullWidth
      multiline
      rows={4}
      label='Description'
      variant='outlined'
      placeholder={t('activity_modal.descriptionField.any_details')}
      value={value}
      onChange={onChange}
    />
  );
};
