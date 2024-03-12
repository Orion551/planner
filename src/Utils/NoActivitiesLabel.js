import React from 'react';
import { Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import '@Assets/styles/ticket.scss';
import { useTranslation } from 'react-i18next';

export function NoActivitiesLabel(props) {
  const { currentDay } = props;
  const { t } = useTranslation();

  return (
    <>
      <div className='clear-task'>
        <AutoAwesomeIcon className={`${currentDay}-clear-icon`} />

        <Typography className={`${currentDay}-clear-text`} variant='h6'>
          {t('all_clear')}
        </Typography>
      </div>
    </>
  );
}
