import React from 'react';
import Chip from '@mui/material/Chip';

export function TagItem(props) {
  const { tag } = props;

  return (
    <>
      <Chip label={tag} />
    </>
  );
}
