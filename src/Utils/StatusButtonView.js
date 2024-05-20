import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

export const StatusButtonView = ({ label, colorCode, click }) => {
  const { t } = useTranslation();
  return (
    <Button
      variant='outlined'
      sx={{ borderColor: colorCode, color: colorCode }}
      onClick={click}
      size='small'
      endIcon={<CircleIcon sx={{ color: colorCode }} />}
    >
      {t(`status.${label}`)}
    </Button>
  );
};
