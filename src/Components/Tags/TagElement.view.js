import React from 'react';
import { Typography } from '@mui/material';
import '@Assets/styles/tag.scss';

export const TagElementView = ({ tagLabel, tagColor }) => {
  tagColor;
  return (
    <>
      <div className='tag' style={{ backgroundColor: tagColor }}>
        <Typography variant='caption' display='block' ml={1} mr={1} noWrap={true} fontWeight={500}>
          {tagLabel}
        </Typography>
      </div>
    </>
  );
};
