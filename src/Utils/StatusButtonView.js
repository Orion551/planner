import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

export const StatusButtonView = ({ label, colorCode, click, isAction }) => {
  const { t } = useTranslation();
  const localizedLabel = !isAction ? t(`status.${label}`) : t(`status.actions.${label}`);
  return (
    <Button
      variant='outlined'
      sx={{ borderColor: colorCode, color: colorCode }}
      onClick={click}
      size='small'
      endIcon={<CircleIcon sx={{ color: colorCode }} />}
    >
      {localizedLabel}
    </Button>
  );
};
