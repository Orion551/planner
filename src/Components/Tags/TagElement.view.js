import React from 'react';
import { Typography } from '@mui/material';
import '@Assets/styles/tag.scss';

export const TagElementView = ({ tagLabel, tagColor }) => {
  tagColor;
  return (
    <>
      <span className='tag' style={{ backgroundColor: tagColor }}>
        <Typography variant='h6'>{tagLabel}</Typography>
      </span>
    </>
  );
};
