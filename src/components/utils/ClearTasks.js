import React from 'react';
import { Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import '../../assets/styles/ticket.scss';

export function ClearTasks(props) {
  const { currentDay } = props;

  return (
    <>
      <div className='clear-task'>
        <AutoAwesomeIcon className={`${currentDay}-clear-icon`} />

        <Typography className={`${currentDay}-clear-text`} variant='h6'>
          All clear today!
        </Typography>
      </div>
    </>
  );
}
