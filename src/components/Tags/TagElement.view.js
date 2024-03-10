import React from 'react';
import Chip from '@mui/material/Chip';

export function TagElementView(props) {
  const { tag } = props;

  return (
    <>
      <Chip label={tag} />
    </>
  );
}
