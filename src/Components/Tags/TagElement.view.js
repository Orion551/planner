import React from 'react';
import Chip from '@mui/material/Chip';

export const TagElementView = ({ tagLabel, tagColor }) => {
  tagColor;
  return (
    <>
      <Chip label={tagLabel} />
    </>
  );
};
